import { useKanbanSelector } from '../../utils/store';
import { Column } from '../../utils/types';
import { useKanbanContext } from '../Kanban';
import Task from './components/Task';

interface ListTasksProps {
  column: Column;
}

const ListTasks = ({ columnId }: any) => {
  // console.log('🚀 ~ file: ListTasks.tsx:10 ~ ListTasks ~ column:', column);
  // const taskIds = column.tasks.map((task) => task.Id);
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);

  const { tasksByStatus } = useKanbanContext() as any;
  const taskIds = tasksByStatus[columnId];
  console.log({ taskIds });

  return (
    <>
      {taskIds.length > 0 &&
        taskIds.map((taskId: any) => {
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
