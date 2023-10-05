import { useKanbanSelector } from '../../utils/store';
import Task from './components/Task';

interface ListTasksProps {
  column: {
    taskIds: string[];
  };
}

const ListTasks = ({ column }: ListTasksProps) => {
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const taskIds = column.taskIds;
  return (
    <>
      {taskIds.length > 0 &&
        taskIds.map((taskID, index) => {
          return (
            <Task
              task={taskMap[taskID]}
              key={taskID}
            />
          );
        })}
    </>
  );
};

export default ListTasks;
