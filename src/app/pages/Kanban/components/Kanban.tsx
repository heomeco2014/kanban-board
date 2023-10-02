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
import { SortableContext, rectSwappingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { createNewColumn, handleMoveCard, handleSwapColumns, increment } from '../redux/kanbanSlice';
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
  const columnIds = Object.keys(columns);
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
    dispatch(handleMoveCard({ active: event.active, over: event.over }));
  };
  const handeDragMove = (event: DragMoveEvent) => {
    console.log('Drag move', event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragItemId(undefined);
    setActiveDragItemType(undefined);
    dispatch(handleSwapColumns({ active: event.active, over: event.over }));
  };
  // End DND Handlers

  // Create new column
  const handleCreateNewCol = () => {
    // Calculate the new columnId and columnOrder based on the existing columns
    const newColumnId = Object.keys(columns).length + 1;
    const newColumnOrder = newColumnId;
    dispatch(
      createNewColumn({
        columnId: newColumnId,
        columnOrder: newColumnOrder,
        columnTitle: `New Column ${newColumnId}`,
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
        },
      },
    }),
  };
  // console.log('columnIds', columnIds);
  return (
    <div className="flex">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnIds}
          strategy={rectSwappingStrategy}
        >
          <ListColumns />
          <DragOverlay
            adjustScale={adjustScale}
            dropAnimation={dropAnimation}
          >
            {!activeDragItemType && null}
            {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? (
              <Column
                column={columns[activeDragItemId as string]}
                id={activeDragItemId as string}
                title={columns[activeDragItemId as string].columnTitle}
              />
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
