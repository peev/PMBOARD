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
    <Card className="bg-card hover:bg-accent/5 transition-colors">
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => onVote(id, 1)}
          >
            <FaThumbsUp className="h-3.5 w-3.5 mr-1.5" />
            <span className="font-medium">{votes}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => onVote(id, -1)}
          >
            <FaThumbsDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 