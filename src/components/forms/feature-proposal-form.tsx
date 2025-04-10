'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface FeatureProposalFormProps {
  onSubmit: (feature: { title: string; description: string }) => void
}

export function FeatureProposalForm({ onSubmit }: FeatureProposalFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    onSubmit({ title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Propose a New Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter feature title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Describe the feature"
              rows={3}
              required
            />
          </div>
          <Button type="submit">Submit Proposal</Button>
        </form>
      </CardContent>
    </Card>
  )
} 