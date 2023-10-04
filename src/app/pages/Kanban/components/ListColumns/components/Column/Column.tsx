import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useKanbanSelector } from '../../../../utils/store';
import { Column as ColumProps, Task as TaskModel } from '../../../../utils/types';
import { CSS } from '@dnd-kit/utilities';
import ListTasks from '../../../Task/ListTasks';

type ColumnProps = {
  column: ColumProps;
};

function Column({ column }: ColumnProps) {
  // console.log('🚀 ~ file: Column.tsx:13 ~ Column ~ column:', column);
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: column.columnId,
    data: { ...column, type: 'column' },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    border: isDragging ? '2px dotted black' : '',
  };

  return (
    <div {...listeners}>
      <div
        className={`min-w-[300px] bg-[#ebecf0] min-h-[40px] h-fit mr-[20px] rounded-xl p-2  ${isDragging ? 'bg-gray-100 opacity-50 z-10' : ''}`}
        {...attributes}
        ref={setNodeRef}
        style={style}
      >
        {column.columnTitle}
        <SortableContext items={column.taskIds}>
          <ListTasks column={column} />
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
