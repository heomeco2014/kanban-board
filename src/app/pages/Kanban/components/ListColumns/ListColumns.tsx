import { useKanbanSelector } from '../../utils/store';
import { Column as ColumnType } from '../../utils/types';
import Column from './components/Column/Column';

interface ListColumnsProps {
  columns: ColumnType[];
}

const ListColumns = ({ columns }: ListColumnsProps) => {
  const columnsMap = useKanbanSelector((state) => state.kanban.columns);
  return (
    <>
      {columns.map((column, index) => (
        <Column
          key={column.columnId}
          column={column}
        />
      ))}
    </>
  );
};

export default ListColumns;
