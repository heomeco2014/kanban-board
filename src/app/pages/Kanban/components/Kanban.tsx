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
  closestCenter,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { fetchData, moveColumn, moveTaskInBetween, moveTaskToColumn, setActiveDragItem } from '../redux/kanbanSlice';
import { useKanbanDispatch, useKanbanSelector } from '../utils/store';
import ListColumns from './ListColumns/ListColumns';
import { createPortal } from 'react-dom';
import { ColumnMap, TaskMap, columnMapStatus, TasksByStatus } from '../utils/types';
import Column from './ListColumns/components/Column/Column';
import Task from './Task/components/Task';
import { createSnapModifier } from '@dnd-kit/modifiers';
import { LexoRank } from 'lexorank';

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

  // const tasks = Object.values(taskMap);
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
  console.log(tasksByStatus);
  return {
    tasksByStatus,
  };
};

const KabanContext = createContext({});

export const Kanban = ({ adjustScale = false }: Props) => {
  const dispatch = useKanbanDispatch();
  const activeDragItemType = useKanbanSelector((state) => state.kanban.state.activeDragItemType);
  const activeDragItemId = useKanbanSelector((state) => state.kanban.state.activeDragItemId);
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  const columnIds = Object.keys(columnMap)
    .sort((a, b) => columnMap[a].Rank.localeCompare(columnMap[b].Rank))
    .map((columnId) => {
      return columnMap[columnId].Id;
    });
  const { tasksByStatus }: TasksByStatus = useKanbanContext();
  console.log('🚀 ~ file: Kanban.tsx:84 ~ Kanban ~ tasksByStatus:', tasksByStatus);
  // console.log(columnIds);
  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag start', event);
    const { active } = event;
    dispatch(setActiveDragItem({ type: active.data.current?.type, id: active.data.current?.Id }));
  };
  const handleDragOver = (event: DragMoveEvent) => {
    console.log('Drag over', event);
    const { active, over } = event;
    if (!active || !over) return;
    if (active.data.current?.type !== 'task') return;
    if (active && over) {
      if (active.data.current?.type === 'task') {
        const activeTask = active.data.current;
        let newTaskRank = '';
        if (over.data.current?.type === 'column') {
          const overColumnValue = over.data.current?.Value;
          console.log('🚀 ~ file: Kanban.tsx:98 ~ handleDragOver ~ overColumnValue:', overColumnValue);
          dispatch(moveTaskToColumn({ activeTask, overColumnValue }));
          return;
        } else if (over.data.current?.type === 'task') {
          const overTask = over.data.current;
          const activeTask = active.data.current;
          console.log('move task in between');
          dispatch(moveTaskInBetween({ activeTask, overTask }));
        } else if (over.data.current?.Status === active.data.current.Status) {
          const overTask = over.data.current;
          const activeTask = active.data.current;
          console.log(
            '🚀 ~ file: Kanban.tsx:113 ~ handleDragOver ~ tasksByStatus[over.data.current?.Status]:',
            tasksByStatus[over.data.current?.Status],
          );
          console.log('🚀 ~ file: Kanban.tsx:113 ~ handleDragOver ~ over.data.current?.sortable?.index:', over.data.current?.sortable?.index);
          if (over.data.current?.sortable?.index === tasksByStatus[over.data.current?.Status].length - 1) {
            console.log('last item');
          }
          dispatch(moveTaskInBetween({ activeTask, overTask }));
        }
      }
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
    // Move column to new place
    const { active, over } = event;
    if (active && over) {
      // MOVE COLUMN
      if (active.data.current?.type === 'column' && over.data.current?.type === 'column') {
        const activeColumnId = active.data.current?.Id;
        const overColumnId = over.data.current?.Id;
        const activeColumn = columnMap[activeColumnId];
        const overColumn = columnMap[overColumnId];
        const activeIndex = columnIds?.indexOf(activeColumnId);
        const overIndex = columnIds?.indexOf(overColumnId);
        let newRank = null;
        // If move column in middle
        // Case 1: Move column to the end of the board
        if (overIndex === columnIds.length - 1) {
          newRank = LexoRank.parse(overColumn.Rank).genNext().toString();
        }
        // Case 2: Move column to the start of the board
        else if (overIndex === 0) {
          newRank = LexoRank.parse(overColumn.Rank).genPrev().toString();
        }
        // Case 3: Move column in the middle
        else {
          // Move column from left -> right
          let leftRank = '',
            rightRank = '';
          if (activeIndex < overIndex) {
            leftRank = columnMap[columnIds[overIndex]].Rank;
            rightRank = columnMap[columnIds[overIndex + 1]].Rank;
          }
          // Move column from right -> left
          else if (activeIndex > overIndex) {
            leftRank = columnMap[columnIds[overIndex - 1]].Rank;
            rightRank = columnMap[columnIds[overIndex]].Rank;
          }
          newRank = LexoRank.parse(leftRank).between(LexoRank.parse(rightRank)).toString();
        }
        dispatch(moveColumn({ activeColumn, newRank }));
      }
    }
    // Reset
    dispatch(setActiveDragItem({ type: '', id: '' }));
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

  const gridSize = 6; // pixels
  const snapToGridModifier = createSnapModifier(gridSize);
  return (
    <div className="flex m-auto w-full h-full p-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCorners}
        // onDragMove={handleDragMove}
        modifiers={[snapToGridModifier]}
      >
        <SortableContext
          items={columnIds}
          strategy={horizontalListSortingStrategy}
        >
          <ListColumns columnIds={columnIds} />
        </SortableContext>
        {createPortal(
          <DragOverlay
            adjustScale={false}
            dropAnimation={dropAnimation}
          >
            {!activeDragItemType && null}
            {activeDragItemType === 'column' ? <Column columnId={activeDragItemId} /> : <Task taskId={activeDragItemId} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>

      <button onClick={() => handleCreateNewCol()}>+ Create new Col</button>
    </div>
  );
};

const KanbanWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useKanbanDispatch();
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);

  const { tasksByStatus } = groupBy({ taskMap, columnMap });
  return (
    <KabanContext.Provider value={{ tasksByStatus }}>
      {/* <DndContext> */}
      {children}
      {/* </DndContext> */}
    </KabanContext.Provider>
  );
};

export const useKanbanContext = () => {
  return useContext(KabanContext);
};

export default KanbanWrapper;
