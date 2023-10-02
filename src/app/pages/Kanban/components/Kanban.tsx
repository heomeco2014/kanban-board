import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { createNewColumn, handleDragEndStore, increment } from '../redux/kanbanSlice';
import { useKanbanDispatch, useKanbanSelector } from '../utils/store';
import Column from './ListColumns/components/Column/Column';
import { useState } from 'react';
import {
  SortableContext,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ListColumns from './ListColumns/ListColumns';

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: { id: UniqueIdentifier; title: string }[];
};

const Kanban = () => {
  const columns = useKanbanSelector((state) => state.kanban.columns);
  const columnIds = Object.keys(columns);
  const dispatch = useKanbanDispatch();
  const value = useKanbanSelector((state) => state.kanban.value);

  const [containers, setContainers] = useState<DNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState('');
  const [itemName, setItemName] = useState([]);
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

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
  };
  const handeDragMove = (event: DragMoveEvent) => {
    console.log('Drag move', event);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    dispatch(handleDragEndStore({ active: event.active, over: event.over }));
  };
  // End DND Handlers
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
  console.log('columnIds', columnIds);
  return (
    <div className="flex">
      <DndContext
        sensors={sensors}
        // onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnIds}
          strategy={rectSwappingStrategy}
        >
          <ListColumns />
        </SortableContext>
      </DndContext>

      <button onClick={() => handleCreateNewCol()}>+ Create new Col</button>
    </div>
  );
};
export default Kanban;
