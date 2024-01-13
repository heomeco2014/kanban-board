import Column from './components/Column/Column';

interface ListColumnsProps {
  columnIds: string[];
}

const ListColumns = ({ columnIds }: ListColumnsProps) => {
  return (
    <>
      {columnIds.length > 0 &&
        columnIds.map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
          />
        ))}
    </>
  );
};

export default ListColumns;
