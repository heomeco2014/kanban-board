import { useKanbanSelector } from '../../utils/store'
import { TasksByStatus } from '../../utils/types'
import { useKanbanContext } from '../KanbanNew'
import Task from './components/Task'

interface ListTasksProps {
  columnId: string
}

const ListTasks = ({ columnId }: ListTasksProps) => {
  const { tasksByStatus }: TasksByStatus = useKanbanContext()
  const taskIds: any = tasksByStatus[columnId as any]

  return (
    <>
      {taskIds.length > 0 &&
        taskIds.map((taskId: string) => {
          return (
            <Task
              key={taskId}
              taskId={taskId}
            />
          )
        })}
    </>
  )
}

export default ListTasks
