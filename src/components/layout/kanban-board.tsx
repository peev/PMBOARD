'use client'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ReactNode } from 'react'

interface KanbanBoardProps {
  children: ReactNode
  onDragEnd: (result: any) => void
}

export function KanbanBoard({ children, onDragEnd }: KanbanBoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </DragDropContext>
  )
}

interface KanbanColumnProps {
  id: string
  title: string
  children: ReactNode
}

export function KanbanColumn({ id, title, children }: KanbanColumnProps) {
  return (
    <div className="kanban-column">
      <h2 className="text-xl font-semibold mb-4 capitalize">{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
} 