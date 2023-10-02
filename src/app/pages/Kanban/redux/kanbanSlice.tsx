import { arrayMove, arraySwap } from '@dnd-kit/sortable';
import { createSlice } from '@reduxjs/toolkit';
export interface Task {
  taskId: string;
  columnId: string;
  status: string;
  title: string;
  rank: number;
}

export interface Column {
  columnId: string;
  columnTitle: string;
  taskIds: string[];
}

export interface TaskMap {
  [key: string]: Task;
}

export interface ColumnMap {
  [key: string]: Column;
}

export interface InitialState {
  value: number;
  taskMap: TaskMap;
  columns: ColumnMap;
}
const initialState = {
  value: 4,
  columnOrderIds: ['column-1', 'column-2', 'column-3', 'column-4'],
  columns: {
    '1': { columnId: 'column-1', columnTitle: 'Todo', taskIds: ['Id1', 'Id2', 'Id3', 'Id4'] },
    '2': { columnId: 'column-2', columnTitle: 'In Progress', taskIds: ['Id5', 'Id6'] },
    '3': { columnId: 'column-3', columnTitle: 'Done', taskIds: [] },
    '4': { columnId: 'column-4', columnTitle: 'Column 4', taskIds: ['Id7', 'Id8', 'Id9'] },
  },
  taskMap: {
    Id1: { taskId: 'Id1', columnId: '1', rank: 1, status: 'todo', title: 'abcd' },
    Id2: { taskId: 'Id2', columnId: '1', rank: 2, status: 'todo', title: 'bcd' },
    Id3: { taskId: 'Id3', columnId: '1', rank: 3, status: 'todo', title: 'fes' },
    Id4: { taskId: 'Id4', columnId: '1', rank: 4, status: 'todo', title: 'hlb' },
    Id5: { taskId: 'Id5', columnId: '2', rank: 2, status: 'inprogress', title: 'vvv' },
    Id6: { taskId: 'Id6', columnId: '2', rank: 3, status: 'inprogress', title: 'adfdf' },
    Id7: { taskId: 'Id7', columnId: '4', rank: 1, status: 'done', title: 'th' },
    Id8: { taskId: 'Id8', columnId: '4', rank: 2, status: 'done', title: 'sks' },
    Id9: { taskId: 'Id9', columnId: '4', rank: 3, status: 'done', title: 'acsa' },
  },
} as InitialState;

export const kanbanSlice = createSlice({
  name: 'Kanban',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    createNewColumn: (state, action) => {
      const { columnId, columnTitle, taskIds } = action.payload;
      state.columns[columnId] = { columnId: columnId, columnTitle, taskIds };
    },
    handleDragEndStore: (state, action) => {
      const { active, over } = action.payload;
      if (over && active.id !== over.id) {
        // Do something when the item is dropped onto a different container
        console.log('active', active);
        console.log('over', over);
        const activeColumn = state.columns[active.id];
        console.log('🚀 ~ file: kanbanSlice.tsx:77 ~ activeColumn:', activeColumn);
        const overColumn = state.columns[over.id];
        console.log('🚀 ~ file: kanbanSlice.tsx:79 ~ overColumn:', overColumn);
        // swap two columns id

        const tmp = state.columns[active.id];
        state.columns[active.id] = state.columns[over.id];
        state.columns[over.id] = tmp;
        console.log('state.columns', state.columns);
        return;
      } else if (over === null) {
        // Do something when the item is dropped outside of any container
        console.log('over is null');
      }
    },
  },
});

export const { increment, decrement, incrementByAmount, createNewColumn, handleDragEndStore } = kanbanSlice.actions;

export default kanbanSlice;
