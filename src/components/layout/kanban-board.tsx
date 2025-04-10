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
      <div className="flex gap-6 h-[calc(100vh-12rem)] p-6 overflow-x-auto">
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
    <div className="flex-shrink-0 w-80 bg-muted/30 rounded-lg shadow-sm">
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4 capitalize px-2">{title}</h2>
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-1 overflow-y-auto"
            >
              <div className="space-y-3 p-2">
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
} 