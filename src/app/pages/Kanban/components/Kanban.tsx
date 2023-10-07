import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { createContext, useContext, useEffect } from 'react';
import { TasksByStatus, fetchData } from '../redux/kanbanSlice';
import { useKanbanDispatch, useKanbanSelector } from '../utils/store';
import ListColumns from './ListColumns/ListColumns';
import { createPortal } from 'react-dom';

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: { id: UniqueIdentifier; title: string }[];
};

interface Props {
  adjustScale?: boolean;
}

export const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'COLUMN',
  TASK: 'TASK',
};

const groupBy = ({ taskMap, columnMap, statusMap }: any) => {
  const tasksByStatus: any = {
    // "Not Started": ["task1", "task2"]
  };

  const tasks = Object.values(taskMap).sort((a: any, b: any) => {
    return a.Rank && b.Rank ? a.Rank.localeCompare(b.Rank) : -1;
  });

  const columnMapStatus: any = {};
  for (const key in columnMap) {
    const column = columnMap[key];
    if (!columnMapStatus[column.Value]) columnMapStatus[column.Value] = column.Id;
    tasksByStatus[column.Id] = [];
  }

  for (const _task of tasks) {
    const task = _task as any;
    const status = task.Status;

    const columnId = columnMapStatus[status];
    if (!!columnId) {
      if (!tasksByStatus[columnId]) tasksByStatus[columnId] = [];
      tasksByStatus[columnId].push(task.Id);
    }
  }

  return {
    tasksByStatus,
  };
};

const KabanContext = createContext({});

const Kanban = ({ adjustScale = false }: Props) => {
  const dispatch = useKanbanDispatch();
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);

  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag start', event);
    const { active } = event;
    // setActiveDragItemId(active.data.current?.Status);
    // setActiveDragItemType(active.data.current?.type === 'column' ? ACTIVE_DRAG_ITEM_TYPE.COLUMN : ACTIVE_DRAG_ITEM_TYPE.TASK);
  };
  const handleDragOver = (event: DragMoveEvent) => {
    console.log('Drag over', event);
    const { active, over } = event;
    if (active && over) {
    }
  };
  const handleDragCancel = (event: DragEndEvent) => {
    console.log('Drag cancel', event);
  };
  const handleDragMove = (event: DragMoveEvent) => {
    console.log('Drag move', event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    console.log('handleDragEnd', event);
    // setActiveDragItemId('');
    // setActiveDragItemType('');
  };
  // End DND Handlers

  // Create new column
  const handleCreateNewCol = () => {};

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <div className="flex m-auto w-full overflow-x-auto overflow-y-hidden">
      <DndContext
        // sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        // onDragMove={handleDragMove}
        // collisionDetection={}gg
      >
        <SortableContext
          items={Object.keys(columnMap).map((columnId) => {
            return columnMap[columnId].Id;
          })}
          strategy={horizontalListSortingStrategy}
        >
          <ListColumns columnIds={Object.keys(columnMap)} />
        </SortableContext>
        {createPortal(
          <DragOverlay
            adjustScale={false}
            // dropAnimation={dropAnimation}
          >
            {/* {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
              <Column column={tasksByStatus[activeDragItemId as string]} />
            ) : (
              <Task task={getTaskById(tasksByStatus, activeDragItemId as string)} />
            )} */}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>

      <button onClick={() => handleCreateNewCol()}>+ Create new Col</button>
    </div>
  );
};

const KanbanWrapper = () => {
  const dispatch = useKanbanDispatch();
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  // const statusMap = useKanbanSelector((state) => state.kanban.statusMap);

  const { tasksByStatus } = groupBy({ taskMap, columnMap });
  return (
    <KabanContext.Provider value={{ tasksByStatus }}>
      <Kanban />
    </KabanContext.Provider>
  );
};

export const useKanbanContext = () => {
  return useContext(KabanContext);
};

export default KanbanWrapper;
