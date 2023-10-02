import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useKanbanSelector } from '../../../../utils/store';
import { Column as ColumProps, Task as TaskModel } from '../../../../utils/types';
import Task from '../../../Task/components/Task';
import { CSS } from '@dnd-kit/utilities';
import ListTasks from '../../../Task/ListTasks';

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
    // transition: null,
    data: { ...column, type: 'column' },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div {...listeners}>
      <div
        className={`min-w-[300px] bg-[#ebecf0] min-h-[40px] h-fit mr-[20px] rounded-xl p-2  ${
          isDragging ? 'bg-blue-500 opacity-50 z-10 translate-x-2 ' : ''
        }`}
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
          <ListTasks column={column} />
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
