import { TaskFromApi, Task as TaskModel } from '../../../redux/kanbanSlice';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useKanbanSelector } from '../../../utils/store';

type TaskProps = {
  task: TaskFromApi;
};

const Task = ({ taskId }: any) => {
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const task = taskMap[taskId];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: taskId,
    data: {
      type: 'task',
      ...task,
    },
  });
  const taskStyle = {
    transform: CSS.Translate.toString(transform),
    animation: isSorting ? '100px' : '',
    transition,
    border: isDragging ? '2px dotted blue' : '',
  };
  if (!task && isDragging) console.log(task);
  return (
    <div {...listeners}>
      <div
        ref={setNodeRef}
        {...attributes}
        style={taskStyle}
        className={`bg-white cursor-pointer mb-2 p-2 max-w-xs rounded-lg overflow-visible shadow-md  ${isDragging ? 'bg-yellow-100 opacity-50' : ''}`}
      >
        <div className="select-none">
          <div className="font-bold text-blue-500">task.taskId: {task?.Id}</div>
          <div>task.title: {task?.Name}</div>
          <div>task.colRank: {task?.colRank}</div>
          <div>task.status: {task?.Status}</div>
          <div>task.Rank: {task?.taskRank}</div>
        </div>
      </div>
    </div>
  );
};

export default Task;
