import React, { useEffect } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd'
import TaskNew from './Task/components/TaskNew'
import { useKanbanDispatch, useKanbanSelector } from '../utils/store'
import { useKanbanContext } from '../../Kanban/components/Kanban'
import { TasksByStatus } from '../utils/types'
import { fetchData } from '../redux/kanbanSlice'

const KanbanNew = () => {
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap)
  const columnIds = Object.keys(columnMap)
    .sort((a, b) => columnMap[a].Rank.localeCompare(columnMap[b].Rank))
    .map((columnId) => {
      return columnMap[columnId].Id
    })
  const dispatch = useKanbanDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  return (
    <DragDropContext
      onDragEnd={(e) => {
        console.log('e', e)
      }}
    >
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping
      >
        {(provided: DroppableProvided) => (
          <div
            style={{
              minHeight: '100vh',
              minWidth: '100vw',
              display: 'inline-flex',
              gap: '.5rem',
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columnIds.map((key: string, index: number) => (
              <Column
                key={key}
                index={index}
                columnId={key}
                // quotes={columns[key]}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default KanbanNew

type Props = {
  columnId: string
  // quotes: Quote[]
  index: number
  isScrollable?: boolean
  isCombineEnabled?: boolean
  useClone?: boolean
}
const Column = (props: Props) => {
  const { columnId, index } = props
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap)
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap)
  const column = columnMap[columnId]
  const { tasksByStatus }: TasksByStatus = useKanbanContext()
  const taskIds: any = tasksByStatus[columnId as any]
  return (
    <>
      <Draggable
        draggableId={columnId}
        index={index}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="max-h-full min-h-full"
          >
            <div className="hover-scroll-bar-y group h-full flex-col">
              <div
                {...provided.dragHandleProps}
                className=" mb-4 flex h-[48px] w-[249px] items-center justify-between rounded-t-[0.25rem] border-t-[2px] border-t-[rgb(135,144,158)] px-2 pt-2 shadow-custom"
                aria-label={'quote list'}
              >
                {column.Value}
              </div>
              <TaskList
                taskIds={taskIds}
                columnId={columnId}
                isDragging={snapshot.isDragging}
              />
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}

const TaskList = ({ taskIds, isDragging, columnId }: any) => {
  return (
    <Droppable
      droppableId={columnId}
      type={'TASK'}
      direction="vertical"
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <div
          {...dropProvided.droppableProps}
          ref={dropProvided.innerRef}
          className="h-full"
        >
          <div>
            {taskIds.map((taskId: string, index: number) => {
              return (
                <TaskNew
                  key={taskId} // Remove this line
                  taskId={taskId}
                  index={index}
                  dropProvided={dropProvided}
                  isDragging={isDragging}
                />
              )
            })}
          </div>
        </div>
      )}
    </Droppable>
  )
}
