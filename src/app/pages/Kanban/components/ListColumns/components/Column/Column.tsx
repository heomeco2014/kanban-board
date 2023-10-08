import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useKanbanSelector } from '../../../../utils/store';
import { CSS } from '@dnd-kit/utilities';
import ListTasks from '../../../Task/ListTasks';
import { useKanbanContext } from '../../../Kanban';
import { TasksByStatus } from '../../../../utils/types';

type ColumnProps = {
  columnId: string;
};

function Column({ columnId }: ColumnProps) {
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  const column = columnMap[columnId];
  const { tasksByStatus }: TasksByStatus = useKanbanContext();
  const taskIds = tasksByStatus[columnId];

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: columnId,
    data: { ...column, type: 'column' },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    border: isDragging ? '2px dotted black' : '',
  };

  return (
    <div
      className="h-full"
      {...attributes}
      {...listeners}
    >
      <div
        className={`min-w-[300px] bg-[#ebecf0] min-h-[40px] mr-[20px] rounded-xl p-2  ${isDragging ? 'bg-gray-100 opacity-50 z-10 h-full' : ''}`}
        ref={setNodeRef}
        style={style}
      >
        {column.Value || ''}
        <SortableContext
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          <ListTasks columnId={columnId} />
        </SortableContext>
        {/* */}
      </div>
    </div>
  );
}

export default Column;
