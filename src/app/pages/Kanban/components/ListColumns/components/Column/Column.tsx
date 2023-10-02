import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useKanbanSelector } from '../../../../utils/store';
import { Column as ColumProps, Task as TaskModel } from '../../../../utils/types';
import Task from '../../../Task/components/Task';
import { CSS } from '@dnd-kit/utilities';

type ColumnProps = {
  column: ColumProps;
  id: string;
  title: string;
};

function Column({ column, id, title }: ColumnProps) {
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const taskIds = column.taskIds;
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={`min-w-[300px] bg-[#ebecf0] min-h-[40px] mr-[20px] rounded-xl p-2 ${isDragging ? 'bg-blue-500 opacity-50 z-10 translate-x-2 ' : ''}`}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
    >
      {column.columnTitle}
      <SortableContext
        items={Object.keys(taskMap).filter((taskId) => {
          return taskMap[taskId].taskId;
        })}
      >
        {taskIds.map((taskId, taskIndex) => (
          <Task
            title={taskMap[taskId].title}
            id={taskMap[taskId].taskId}
            key={taskMap[taskId].taskId}
            task={taskMap[taskId]}
          />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;
