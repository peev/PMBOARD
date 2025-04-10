'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

interface FeatureCardProps {
  id: string
  title: string
  description: string
  votes: number
  onVote: (id: string, increment: number) => void
}

export function FeatureCard({
  id,
  title,
  description,
  votes,
  onVote,
}: FeatureCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="vote-button-up"
            onClick={() => onVote(id, 1)}
          >
            <FaThumbsUp className="inline mr-1" />
            {votes}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="vote-button-down"
            onClick={() => onVote(id, -1)}
          >
            <FaThumbsDown className="inline mr-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 