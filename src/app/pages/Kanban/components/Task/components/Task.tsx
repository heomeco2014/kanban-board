import { Task as TaskModel } from '../../../redux/kanbanSlice';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskProps = {
  task: TaskModel;
};

const Task = ({ task }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: task?.taskId,
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
  if (!task) return <></>;
  return (
    <div {...listeners}>
      <div
        ref={setNodeRef}
        {...attributes}
        style={taskStyle}
        className={`bg-white cursor-pointer mb-2 p-2 max-w-xs rounded-lg overflow-visible shadow-md  ${isDragging ? 'bg-yellow-100 opacity-50' : ''}`}
      >
        <div className="select-none">
          <div className="font-bold">task.taskId: {task?.taskId}</div>
          <div>task.title: {task.title}</div>
          <div>task.status: {task.status}</div>
          <div>task.taskOrder: {task.taskOrder}</div>
        </div>
      </div>
    </div>
  );
};

export default Task;
