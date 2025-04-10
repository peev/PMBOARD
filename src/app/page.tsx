'use client'

import { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { FeatureCard } from '@/components/ui/feature-card'
import { KanbanBoard, KanbanColumn } from '@/components/layout/kanban-board'
import { FeatureProposalForm } from '@/components/forms/feature-proposal-form'
import { getFeatures, createFeature, updateFeatureStatus, updateFeatureVotes } from '@/lib/features'
import type { Feature } from '@/types/database'

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadFeatures()
  }, [])

  async function loadFeatures() {
    try {
      const data = await getFeatures()
      setFeatures(data)
    } catch (error) {
      console.error('Error loading features:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const sourceColumn = result.source.droppableId
    const destinationColumn = result.destination.droppableId

    if (sourceColumn !== destinationColumn) {
      const featureId = result.draggableId
      try {
        await updateFeatureStatus(featureId, destinationColumn as Feature['status'])
        const updatedFeatures = features.map(feature =>
          feature.id === featureId
            ? { ...feature, status: destinationColumn as Feature['status'] }
            : feature
        )
        setFeatures(updatedFeatures)
      } catch (error) {
        console.error('Error updating feature status:', error)
      }
    }
  }

  const handleVote = async (featureId: string, increment: number) => {
    try {
      const feature = features.find(f => f.id === featureId)
      if (!feature) return

      const newVotes = feature.votes + increment
      await updateFeatureVotes(featureId, newVotes)
      
      setFeatures(features.map(f =>
        f.id === featureId ? { ...f, votes: newVotes } : f
      ))
    } catch (error) {
      console.error('Error updating votes:', error)
    }
  }

  const handleFeatureSubmit = async ({ title, description }: { title: string; description: string }) => {
    try {
      const newFeature = await createFeature({
        title,
        description,
        votes: 0,
        status: 'proposed'
      })
      setFeatures([newFeature, ...features])
    } catch (error) {
      console.error('Error creating feature:', error)
    }
  }

  const columns = {
    proposed: features.filter(f => f.status === 'proposed'),
    backlog: features.filter(f => f.status === 'backlog'),
    'in-progress': features.filter(f => f.status === 'in-progress'),
    completed: features.filter(f => f.status === 'completed')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Feature Voting Board</h1>
      
      <FeatureProposalForm onSubmit={handleFeatureSubmit} />
      
      <KanbanBoard onDragEnd={handleDragEnd}>
        {Object.entries(columns).map(([columnId, columnFeatures]) => (
          <KanbanColumn key={columnId} id={columnId} title={columnId.replace('-', ' ')}>
            {columnFeatures.map((feature, index) => (
              <Draggable
                key={feature.id}
                draggableId={feature.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <FeatureCard
                      id={feature.id}
                      title={feature.title}
                      description={feature.description}
                      votes={feature.votes}
                      onVote={handleVote}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </KanbanColumn>
        ))}
      </KanbanBoard>
    </div>
  )
} 