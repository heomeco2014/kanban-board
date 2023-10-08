import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchData, setActiveDragItem } from '../redux/kanbanSlice';
import { useKanbanDispatch, useKanbanSelector } from '../utils/store';
import ListColumns from './ListColumns/ListColumns';
import { createPortal } from 'react-dom';
import { ColumnMap, TaskMap, columnMapStatus, TasksByStatus } from '../utils/types';
import Column from './ListColumns/components/Column/Column';
import Task from './Task/components/Task';

interface Props {
  adjustScale?: boolean;
}

export const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'COLUMN',
  TASK: 'TASK',
};

const groupBy = ({ taskMap, columnMap }: { taskMap: TaskMap; columnMap: ColumnMap }) => {
  const tasksByStatus: TasksByStatus = {
    // "Not Started": ["task1", "task2"]
  };

  const tasks = Object.values(taskMap).sort((a, b) => {
    return a.Rank && b.Rank ? a.Rank.localeCompare(b.Rank) : -1;
  });

  const columnMapStatus: columnMapStatus = {};
  for (const key in columnMap) {
    const column = columnMap[key];
    if (!columnMapStatus[column.Value]) columnMapStatus[column.Value] = column.Id;
    tasksByStatus[column.Id] = [];
  }

  for (const _task of tasks) {
    const task = _task;
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
  const activeDragItemType = useKanbanSelector((state) => state.kanban.state.activeDragItemType);
  const activeDragItemId = useKanbanSelector((state) => state.kanban.state.activeDragItemId);
  const dispatch = useKanbanDispatch();
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag start', event);
    const { active } = event;
    dispatch(setActiveDragItem({ type: active.data.current?.type, id: active.data.current?.Id }));
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
          transform: 'scale(0.95)',
        },
      },
    }),
  };
  // End DND Handlers

  // Create new column
  const handleCreateNewCol = () => {};
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="flex m-auto w-full overflow-x-auto overflow-y-hidden p-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        // onDragMove={handleDragMove}
        collisionDetection={closestCorners}
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
            dropAnimation={dropAnimation}
          >
            {/* {!activeDragItemType && null} */}
            {activeDragItemType === 'column' ? <Column columnId={activeDragItemId} /> : <Task taskId={activeDragItemId} />}
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
