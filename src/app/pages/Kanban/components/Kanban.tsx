import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import {
  createNewColumn,
  handleDragTaskOverColumn,
  handleMoveCardInsideColumn,
  handleMoveCardToAnotherColumn,
  handleMoveColumns,
  increment,
} from '../redux/kanbanSlice';
import { useKanbanDispatch, useKanbanSelector } from '../utils/store';
import ListColumns from './ListColumns/ListColumns';
import Column from './ListColumns/components/Column/Column';
import Task from './Task/components/Task';

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

const Kanban = ({ adjustScale = false }: Props) => {
  const columns = useKanbanSelector((state) => state.kanban.columns);
  // const columnIds = Object.values(columns).map((col) => col.columnId);
  const board = useKanbanSelector((state) => state.kanban.board);
  const columnIds = board.columnOrderIds;
  const columnMapByOrderId = columnIds.map((colId) => columns[colId]);
  const taskMap = useKanbanSelector((state) => state.kanban.taskMap);
  const dispatch = useKanbanDispatch();
  const [activeDragItemId, setActiveDragItemId] = useState<UniqueIdentifier>();
  const [activeDragItemType, setActiveDragItemType] = useState<String>();

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  const pointerSensor = useSensor(PointerSensor);
  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag start', event);
    const { active } = event;
    setActiveDragItemId(active.id);
    setActiveDragItemType(active.data.current?.type === 'column' ? ACTIVE_DRAG_ITEM_TYPE.COLUMN : ACTIVE_DRAG_ITEM_TYPE.TASK);
  };
  const handleDragOver = (event: DragMoveEvent) => {
    console.log('Drag over', event);
    const { active, over } = event;
    if (active && over) {
      const oldColId = active.data.current?.columnId;
      const newColId = over.data.current?.columnId;
      const oldIndex = columns[oldColId].taskIds.indexOf(active.id.toString());
      const newIndex = columns[newColId].taskIds.indexOf(over.id.toString());
      if (
        active.data.current?.type === 'task' &&
        over?.data.current?.type === 'task' &&
        over.data.current?.columnId !== active.data.current?.columnId
      ) {
        console.log('move card to another column');
        const oldColId = active.data.current?.columnId;
        const newColId = over.data.current?.columnId;
        const oldIndex = columns[oldColId].taskIds.indexOf(active.id.toString());
        const newIndex = columns[newColId].taskIds.indexOf(over.id.toString());
        dispatch(
          handleMoveCardToAnotherColumn({
            oldColId,
            newColId,
            oldIndex,
            newIndex,
          }),
        );
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

    // if (!activeDragItemId || !activeDragItemType) {
    //   setActiveDragItemId('');
    //   setActiveDragItemType('');
    //   return;
    // }
    const { over, active } = event;
    // Move column
    if (active.data.current?.type === 'column' && over?.data.current?.type === 'column') {
      if (active.data.current?.columnId !== over.data.current?.columnId) {
        console.log('Move column');
        const oldIndex = board.columnOrderIds.indexOf(active.id.toString());
        const newIndex = board.columnOrderIds.indexOf(over.id.toString());
        dispatch(handleMoveColumns({ oldIndex, newIndex }));
      }
    }

    // Move task inside its own column (in the same column)
    if (
      active.data.current?.type === 'task' &&
      over?.data.current?.type === 'task' &&
      active.id !== over.id &&
      over.data.current?.columnId === active.data.current?.columnId
    ) {
      if (over.data.current?.columnId === active.data.current?.columnId) {
        console.log('Move task inside column');
        const oldIndex = columns[active.data.current.columnId].taskIds.indexOf(active.id.toString());
        const newIndex = columns[active.data.current.columnId].taskIds.indexOf(over.id.toString());
        dispatch(handleMoveCardInsideColumn({ colId: active.data.current.columnId, oldTaskIndex: oldIndex, newTaskIndex: newIndex }));
      }
    }
    // Move task to another column
    if (
      active.data.current?.type === 'task' &&
      over?.data.current?.type === 'task' &&
      over.data.current?.columnId !== active.data.current?.columnId
    ) {
      console.log('move card to another column');
      const oldColId = active.data.current?.columnId;
      const newColId = over.data.current?.columnId;
      const oldIndex = columns[oldColId].taskIds.indexOf(active.id.toString());
      const newIndex = columns[newColId].taskIds.indexOf(over.id.toString());
      dispatch(
        handleMoveCardToAnotherColumn({
          oldColId,
          newColId,
          oldIndex,
          newIndex,
        }),
      );
    }
    setActiveDragItemId('');
    setActiveDragItemType('');
  };
  // End DND Handlers

  // Create new column
  const handleCreateNewCol = () => {
    // Calculate the new columnId and columnOrder based on the existing columns
    const newColumnId = 'column-' + (Object.keys(columns).length + 1);
    const newColumnOrder = newColumnId;
    dispatch(
      createNewColumn({
        columnId: newColumnId,
        columnOrder: newColumnOrder,
        columnTitle: `New ${newColumnId}`,
        taskIds: [],
      }),
    );
    dispatch(increment());
    console.log('newColumnId', newColumnId);
  };
  // End create new column

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
  return (
    <div className="flex">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        // onDragMove={handleDragMove}
      >
        <SortableContext
          items={columnIds}
          strategy={horizontalListSortingStrategy}
        >
          <ListColumns columns={columnMapByOrderId} />
          <DragOverlay
            adjustScale={adjustScale}
            dropAnimation={dropAnimation}
          >
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
              <Column column={columns[activeDragItemId as string]} />
            ) : (
              <Task task={taskMap[activeDragItemId as string]} />
            )}
          </DragOverlay>
        </SortableContext>
      </DndContext>

      <button onClick={() => handleCreateNewCol()}>+ Create new Col</button>
    </div>
  );
};
export default Kanban;
