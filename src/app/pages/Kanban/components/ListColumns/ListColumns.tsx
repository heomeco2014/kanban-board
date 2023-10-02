import { useKanbanSelector } from '../../utils/store';
import Column from './components/Column/Column';

const ListColumns = () => {
  const columns = useKanbanSelector((state) => state.kanban.columns);
  const columnIds = Object.keys(columns);
  return (
    <>
      {columnIds.map((columnId, index) => (
        <Column
          key={columnId}
          column={columns[columnId]}
          id={columnId}
          title={columns[columnId].columnTitle}
        />
      ))}
    </>
  );
};

export default ListColumns;
