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
import { fetchData, moveColumn, moveTaskInBetween, moveTaskInsideOwnColumn, moveTaskToColumn, setActiveDragItem } from '../redux/kanbanSlice';
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

// Utilities
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

const getColumnByStatus = ({ status, columnMap }: { status: string; columnMap: ColumnMap }) => {
  for (const key in columnMap) {
    const column = columnMap[key];
    if (column.Value === status) return column;
  }
  return null;
};
// End Utilities
const KabanContext = createContext({});

export const Kanban = ({ adjustScale = false }: Props) => {
  const dispatch = useKanbanDispatch();
  const activeDragItemType = useKanbanSelector((state) => state.kanban.state.activeDragItemType);
  const activeDragItemId = useKanbanSelector((state) => state.kanban.state.activeDragItemId);
  const columnMap = useKanbanSelector((state) => state.kanban.columnMap);
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const columnIds = Object.keys(columnMap)
    .sort((a, b) => columnMap[a].Rank.localeCompare(columnMap[b].Rank))
    .map((columnId) => {
      return columnMap[columnId].Id;
    });
  const { tasksByStatus }: TasksByStatus = useKanbanContext();
  // console.log('🚀 ~ file: Kanban.tsx:84 ~ Kanban ~ tasksByStatus:', tasksByStatus);
  // console.log(columnIds);
  const handleDragStart = (event: DragStartEvent) => {
    // console.log('Drag start', event);
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
          // console.log('🚀 ~ file: Kanban.tsx:98 ~ handleDragOver ~ overColumnValue:', overColumnValue);
          dispatch(moveTaskToColumn({ activeTask, overColumnValue }));
          return;
        }

        // TODO: THIS MIGHT CAUSING BUG
        else if (over.data.current?.type === 'task') {
          const overTask = over.data.current;
          const activeTask = active.data.current;
          // console.log('move task in between');
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
    if (!active || !over) return;
    if (active && over) {
      const activeTask = active.data.current;
      const overTask = over.data.current;
      // MOVE COLUMN
      if (active.data.current?.type === 'column' && over.data.current?.type === 'column') {
        const activeColumnId = active.data.current?.Id;
        const overColumnId = over.data.current?.Id;
        const activeColumn = columnMap[activeColumnId];
        const overColumn = columnMap[overColumnId];
        const activeIndex = columnIds?.indexOf(activeColumnId);
        const overIndex = columnIds?.indexOf(overColumnId);
        let newRank = null;
        // If move column in the middle
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

      // MOVE TASK (INSIDE ITS OWN)

      // MOVE TASK TO THE TOP OF THE COLUMN
      const column = getColumnByStatus({ status: overTask?.Status, columnMap });
      if (!column) return;
      if (!overTask?.sortable?.index) {
        console.log(overTask?.sortable?.index);
        const newActiveTaskRank = LexoRank.parse(overTask?.Rank).genPrev().toString();
        // console.log('🚀 ~ file: Kanban.tsx:181 ~ handleDragEnd ~ newActiveTaskRank:', newActiveTaskRank);
        dispatch(moveTaskInsideOwnColumn({ activeTask, overTask: { ...overTask, Rank: newActiveTaskRank } }));
      }

      // MOVE TASK TO THE BOTTOM OF THE COLUMN
      // console.log('taskByStatus', tasksByStatus);
      // console.log('tasksByStatus[getColumnByStatus(overTask?.Status)?.Id].length - 1', overTask?.Status);
      // console.log('🚀 ~ file: Kanban.tsx:200 ~ handleDragEnd ~ column:', column);
      // console.log(tasksByStatus[column?.Id].length - 1);
      else if (overTask?.sortable?.index === tasksByStatus[column?.Id].length - 1) {
        const newActiveTaskRank = LexoRank.parse(overTask?.Rank).genNext().toString();
        dispatch(moveTaskInsideOwnColumn({ activeTask, overTask: { ...overTask, Rank: newActiveTaskRank } }));
        // console.log('Move task to the end of the column');
      } else {
        // console.log('Move task in between');
        // dispatch(moveTaskInBetween({ activeTask, overTask }));
        // ? Case 1: Move task inside its own column
        // * Check if the active task has the same status with the over task
        if (overTask.sortable.containerId === activeTask?.sortable.containerId) {
          const activeTaskIndex = activeTask?.sortable?.index;
          const overTaskIndex = overTask?.sortable?.index;
          // Move task from top -> bottom
          if (overTaskIndex > activeTaskIndex) {
            const topRank = taskMap[overTask.Id].Rank;
            const bottomRank = taskMap[tasksByStatus[column?.Id][overTaskIndex + 1]].Rank;
            const newActiveTaskRank = LexoRank.parse(topRank).between(LexoRank.parse(bottomRank)).toString();
            dispatch(moveTaskInsideOwnColumn({ activeTask, overTask: { ...overTask, Rank: newActiveTaskRank } }));
          } else if (overTaskIndex < activeTaskIndex) {
            const topRank = taskMap[tasksByStatus[column?.Id][overTaskIndex - 1]].Rank;
            const bottomRank = taskMap[overTask.Id].Rank;
            const newActiveTaskRank = LexoRank.parse(topRank).between(LexoRank.parse(bottomRank)).toString();
            dispatch(moveTaskInsideOwnColumn({ activeTask, overTask: { ...overTask, Rank: newActiveTaskRank } }));
          }
        }
        // ? Case 2: Move task to another column
        // *
      }
    }
    // Reset
    dispatch(setActiveDragItem({ type: '', id: '' }));
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
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
        // onDragMove={handleDragMove}
        // collisionDetection={closestCorners}
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
