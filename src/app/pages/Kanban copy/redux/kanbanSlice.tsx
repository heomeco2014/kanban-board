import { arrayMove, arraySwap } from '@dnd-kit/sortable';
import { createSlice, current } from '@reduxjs/toolkit';
import { LexoRank } from 'lexorank';
import dummyData from './dummyData';
import _ from 'lodash';
import { Column, InitialState, StatusMap, TaskMap } from '../utils/types';

const initialState = {
  taskMap: {},
  columnMap: {},
  statusMap: {},

  state: {
    activeDragItemType: '',
    activeDragItemId: '',
  },
} as InitialState;

export const kanbanSlice = createSlice({
  name: 'Kanban',
  initialState: initialState,
  reducers: {
    fetchData: (state) => {
      const action = { payload: { ...dummyData } };
      state.statusMap = _.keyBy(action.payload.statuses, 'value') as StatusMap;
      state.taskMap = _.keyBy(action.payload.tasks, 'Id') as TaskMap;
      const columns = action.payload.columns.sort((a, b) => {
        return a.Rank && b.Rank ? LexoRank.parse(a.Rank).compareTo(LexoRank.parse(b.Rank)) : -1;
      });
      for (const column of columns) {
        const status = state.statusMap[column.Value];
        state.columnMap[column.Id] = {
          ...column,
          item: { ...status },
        } as Column;
      }
      // state.columnMap
      // console.log('🚀 ~ file: kanbanSlice.tsx:35 ~ state.columnMap:', current(state.columnMap));
      const sorted = Object.values(state.columnMap).sort((a, b) => {
        return a.Rank && b.Rank ? a.Rank.localeCompare(b.Rank) : -1;
      });
      for (const key in sorted) {
        const column = sorted[key];
        column.Rank = LexoRank.parse(column.Rank).toString();
        state.columnMap[column.Id] = column;
      }
      console.log('current taskMap', state.taskMap);
      console.log('current column', current(state.columnMap));
      console.log('current statusMap', state.statusMap);
    },
    // State reduce
    setActiveDragItem: (state, action) => {
      state.state.activeDragItemType = action.payload.type;
      state.state.activeDragItemId = action.payload.id;
    },
    moveColumn: (state, action) => {
      const { activeColumn, newRank } = action.payload;
      // Move column
      state.columnMap[activeColumn.Id].Rank = newRank;
      // console.log('🚀 ~ file: kanbanSlice.tsx:46 ~ state.columnMap:', current(state.columnMap));
    },
    moveTaskToColumn: (state, action) => {
      const { activeTask, overColumnValue } = action.payload;
      state.taskMap[activeTask.Id] = {
        ...state.taskMap[activeTask.Id],
        Status: overColumnValue,
      };
    },
    moveTaskInBetween: (state, action) => {
      const { activeTask, overTask } = action.payload;
      if (activeTask.Status !== overTask.Status) {
        state.taskMap[activeTask.Id] = {
          ...state.taskMap[activeTask.Id],
          Status: overTask.Status,
        };
      }
    },
    moveTaskInsideOwnColumn: (state, action) => {
      const { activeTask, overTask } = action.payload;
      state.taskMap[activeTask.Id].Rank = overTask.Rank;
    },

    moveTask: (state, action) => {
      const { activeTask, overTask, columnId, newRank } = action.payload;
      const column = state.columnMap[columnId];
      const task = { ...state.taskMap[activeTask.Id] };

      state.taskMap[activeTask.Id].Status = column.Value;
      if (columnId) {
        console.log(columnId);
      }
      if (newRank) {
        state.taskMap[activeTask.Id].Rank = newRank;
      }
    },

    createNewTask: (state, action) => {
      const { columnId, newTaskTitle, newRank } = action.payload;
      const column = state.columnMap[columnId];
      const task = {
        Id: 'task-' + Date.now(),
        Name: newTaskTitle,
        Status: column.Value,
        Rank: newRank ?? LexoRank.min().toString(),
      };
      state.taskMap[task.Id] = task as any;
    },
    createNewColumn: (state, action) => {
      const { newColumnValue, newRank } = action.payload;
      const column = {
        Id: 'column-' + Date.now(),
        Name: newColumnValue,
        Value: newColumnValue,
        Rank: newRank,
      };
      state.columnMap[column.Id] = column as any;
    },
  },
});

export const {
  fetchData,
  setActiveDragItem,
  moveColumn,
  moveTaskToColumn,
  moveTaskInBetween,
  moveTaskInsideOwnColumn,
  moveTask,
  createNewTask,
  createNewColumn,
} = kanbanSlice.actions;

export default kanbanSlice;
