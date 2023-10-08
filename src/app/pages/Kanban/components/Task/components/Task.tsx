import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useKanbanSelector } from '../../../utils/store';
import { Task as _Task } from '../../../utils/types';

type TaskProps = {
  taskId: string;
};

const Task = ({ taskId }: TaskProps) => {
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
    transition,
    border: isDragging ? '2px dotted blue' : '',
  };
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
          <div>task.status: {task?.Status}</div>
          <div>task.Rank: {task?.Rank}</div>
        </div>
      </div>
    </div>
  );
};

export default Task;
