import React, { memo } from 'react'
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from 'react-beautiful-dnd'
import { useKanbanSelector } from '../../../utils/store'
type Props = {
  taskId: string
  isDragging: boolean
  dropProvided: DroppableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: Object
  index: number
}
const TaskNew = (props: Props) => {
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap)
  const { taskId, index } = props
  const task = taskMap[taskId]
  return (
    <Draggable
      draggableId={taskId}
      index={index}
    >
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot
      ) => (
        <div
          className={`cursor-pointer rounded-[1px] border-[1px] border-[#E8EAED] bg-white p-task shadow-sm`}
          key={taskId}
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <div className="select-none">
            <div className="font-bold text-blue-500">
              task.taskId: {task?.Id}
            </div>
            <div>task.title: {task?.Name}</div>
            <div>task.status: {task?.Status}</div>
            <div>task.Rank: {task?.Rank}</div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default memo(TaskNew)
