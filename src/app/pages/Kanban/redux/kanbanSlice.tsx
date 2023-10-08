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
      for (const column of action.payload.columns) {
        const status = state.statusMap[column.Value];
        state.columnMap[column.Id] = {
          ...column,
          item: { ...status },
        } as Column;
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
  },
});

export const { fetchData, setActiveDragItem } = kanbanSlice.actions;

export default kanbanSlice;
