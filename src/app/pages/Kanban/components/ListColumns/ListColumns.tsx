import { useKanbanSelector } from '../../utils/store';
import { Column as ColumnType } from '../../utils/types';
import Column from './components/Column/Column';

interface ListColumnsProps {
  columns: ColumnType[];
}

const ListColumns = ({ columnIds }: any) => {
  // console.log('🚀 ~ file: ListColumns.tsx:10 ~ ListColumns ~ columns:', columns);
  // const tasksByStatus = useKanbanSelector((state) => state.kanban.tasksByStatus);
  // console.log('🚀 ~ file: ListColumns.tsx:12 ~ ListColumns ~ tasksByStatus:', tasksByStatus);
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);

  return (
    <>
      {columnIds.length > 0 &&
        columnIds.map((columnId: any) => (
          <Column
            key={columnId}
            columnId={columnId}
          />
        ))}
    </>
  );
};

export default ListColumns;
