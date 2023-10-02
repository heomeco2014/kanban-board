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
      {taskIds.map((taskId, taskIndex) => (
        <Task
          task={taskMap[taskId]}
          key={taskMap[taskId].taskId}
          // title={taskMap[taskId].title}
          // id={taskMap[taskId].taskId}
        />
      ))}
    </>
  );
};

export default ListTasks;
