import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useKanbanSelector } from '../../../../utils/store'
import { CSS } from '@dnd-kit/utilities'
import ListTasks from '../../../Task/ListTasks'
import { useKanbanContext } from '../../../KanbanNew'
import { TasksByStatus } from '../../../../utils/types'
import AddNewTaskFooter from '../../../Task/components/AddNewTaskFooter'
import { useState } from 'react'

type ColumnProps = {
  columnId: string
}

function Column({ columnId }: ColumnProps) {
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap)
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap)
  const column = columnMap[columnId]
  const { tasksByStatus }: TasksByStatus = useKanbanContext()
  const taskIds: any = tasksByStatus[columnId as any]
  const [state, _setState] = useState({
    isOpenCreateTask: false,
  })
  const setState = (newState: any) => _setState({ ...state, ...newState })
  const handleOnOff = () =>
    setState({ isOpenCreateTask: !state.isOpenCreateTask })
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id: columnId,
    data: { ...column, type: 'column' },
    transition: {
      duration: 350, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // border: isDragging ? '2px dotted black' : '',
  }
  return (
    <div
      className="max-h-full min-h-full"
      ref={setNodeRef}
      style={style}
    >
      <div
        className="hover-scroll-bar-y group max-h-max flex-col"
        {...listeners}
      >
        <div
          className="
          mb-4
          flex
          h-[48px]
          w-[249px] items-center justify-between rounded-t-[0.25rem] border-t-[2px]
          border-t-[rgb(135,144,158)]
          px-2
          pt-2
          shadow-custom
          "
        >
          <div className="flex select-none items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-[500] uppercase">
            <span className="">{column.Value || ''}</span>
            <span className="inline-flex rounded-full  bg-gray-100 px-2 py-1">
              12
            </span>
          </div>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline-flex h-6 w-6 cursor-pointer rounded-xl bg-gray-100 p-1 hover:bg-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
        </div>
        <div
          className={`hidden-scroll-bar-y mb-1 flex max-h-[42rem] w-[249px] flex-col gap-y-2 overflow-y-auto pr-1 ${
            isDragging ? 'opacity-50' : ''
          }`}
          {...attributes}
        >
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            <ListTasks columnId={columnId} />
          </SortableContext>
        </div>
        {!state.isOpenCreateTask ? (
          <button
            className="cursor-pointer self-start rounded-[0.375rem] border-[1px] border-transparent px-[11px] py-[7px] leading-4 antialiased opacity-0 hover:bg-[rgb(240,241,243)] group-hover:opacity-100"
            onClick={() => setState({ isOpenCreateTask: true })}
          >
            + New Task
          </button>
        ) : (
          <AddNewTaskFooter
            toggleOnOff={handleOnOff}
            columnId={columnId}
          />
        )}
      </div>
    </div>
  )
}

export default Column
