import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useKanbanSelector } from '../../../../utils/store';
import { Column as ColumProps, Task as TaskModel } from '../../../../utils/types';
import { CSS } from '@dnd-kit/utilities';
import ListTasks from '../../../Task/ListTasks';
import { useKanbanContext } from '../../../Kanban';

type ColumnProps = {
  column: ColumProps;
};

function Column({ columnId }: any) {
  // console.log('🚀 ~ file: Column.tsx:13 ~ Column ~ column:', column);
  // console.log(
  //   '🚀 ~ file: Column.tsx:13 ~ Task Rank:',
  //   column.tasks.map((task) => task.taskRank),
  // );
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  const column = columnMap[columnId];
  const { tasksByStatus } = useKanbanContext() as any;
  console.log({ tasksByStatus, columnId });
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
    <div ref={setNodeRef}>
      <div
        className={`min-w-[300px] bg-[#ebecf0] min-h-[40px] mr-[20px] rounded-xl p-2  ${isDragging ? 'bg-gray-100 opacity-50 z-10 h-full' : ''}`}
        {...attributes}
        {...listeners}
        style={style}
      >
        {column.item.label || ''}
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
