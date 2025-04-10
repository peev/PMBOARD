'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FeatureProposalFormProps {
  onSubmit: (feature: { title: string; description: string }) => void
}

export function FeatureProposalForm({ onSubmit }: FeatureProposalFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) return

    onSubmit({ title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Propose a New Feature</CardTitle>
        <CardDescription>
          Submit your feature request for consideration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="Enter a clear, concise title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              placeholder="Provide details about the feature and its benefits"
              className="min-h-[120px]"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Proposal
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 