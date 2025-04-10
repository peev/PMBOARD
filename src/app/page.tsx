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
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Feature Voting Board</h1>
          <p className="text-muted-foreground text-center">Track and vote on feature requests</p>
        </header>
        
        <div className="grid lg:grid-cols-[400px,1fr] gap-8">
          <aside>
            <FeatureProposalForm onSubmit={handleFeatureSubmit} />
          </aside>
          
          <main>
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
          </main>
        </div>
      </div>
    </div>
  )
} 