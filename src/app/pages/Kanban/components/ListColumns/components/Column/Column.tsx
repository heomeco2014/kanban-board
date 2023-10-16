import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useKanbanSelector } from '../../../../utils/store';
import { CSS } from '@dnd-kit/utilities';
import ListTasks from '../../../Task/ListTasks';
import { useKanbanContext } from '../../../Kanban';
import { TasksByStatus } from '../../../../utils/types';
import { UniqueIdentifier } from '@dnd-kit/core';

type ColumnProps = {
  columnId: string;
};

function Column({ columnId }: ColumnProps) {
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const column = columnMap[columnId];
  const { tasksByStatus }: TasksByStatus = useKanbanContext();
  const taskIds: any = tasksByStatus[columnId as any];

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, isSorting } = useSortable({
    id: columnId,
    data: { ...column, type: 'column' },
    transition: {
      duration: 350, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    border: isDragging ? '2px dotted black' : '',
  };

  return (
    <div
      className="min-h-[500px]"
      ref={setNodeRef}
    >
      <div
        className={`w-[300px] bg-[#ebecf0] mr-[20px] rounded-xl p-2 min-h-[500px] ${isDragging ? 'bg-gray-100 opacity-50 z-10 min-h-full' : ''}`}
        {...attributes}
        {...listeners}
        style={style}
      >
        <span className="select-none">{column.Value || ''}</span>
        <SortableContext
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          <ListTasks columnId={columnId} />
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;
