import { useKanbanSelector } from '../../utils/store';
import { TasksByStatus } from '../../utils/types';
import { useKanbanContext } from '../Kanban';
import Task from './components/Task';

interface ListTasksProps {
  columnId: string;
}

const ListTasks = ({ columnId }: ListTasksProps) => {
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);

  const { tasksByStatus }: TasksByStatus = useKanbanContext();
  const taskIds: string[] = tasksByStatus[columnId];
  // console.log({ taskIds });

  return (
    <>
      {taskIds.length > 0 &&
        taskIds.map((taskId: string) => {
          return (
            <Task
              key={taskId}
              taskId={taskId}
            />
          );
        })}
    </>
  );
};

export default ListTasks;
