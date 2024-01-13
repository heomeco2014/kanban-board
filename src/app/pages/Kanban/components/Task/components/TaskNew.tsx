import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { useKanbanSelector } from '../../../utils/store'
type Props = {
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: Object
  index?: number
}
const TaskNew = (props: Props) => {
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap)
  return (
    <div
      className={`cursor-pointer rounded-[1px] border-[1px] border-[#E8EAED] bg-white p-task shadow-sm`}
    >
      <div className="select-none">
        <div className="font-bold text-blue-500">task.taskId: {'task?.Id'}</div>
        <div>task.title: {'task?.Name'}</div>
        <div>task.status: {'task?.Status'}</div>
        <div>task.Rank: {'task?.Rank'}</div>
      </div>
    </div>
  )
}

export default TaskNew
