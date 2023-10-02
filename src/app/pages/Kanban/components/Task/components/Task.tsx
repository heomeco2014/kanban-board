import { Task as TaskModel } from '../../../redux/kanbanSlice';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TaskProps = {
  task: TaskModel;
  key: string;
  title: string;
  id: string;
};

const Task = ({ task, id, title }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });
  return (
    <div className={`bg-white cursor-pointer mb-2 p-2 max-w-xs rounded-lg shadow-md ${false ? 'bg-yellow-100' : ''}`}>
      <div className="font-bold">
        id:{id} title:{title}
      </div>
    </div>
  );
};

export default Task;
