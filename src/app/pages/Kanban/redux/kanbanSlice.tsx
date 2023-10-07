// import { arrayMove, arraySwap } from '@dnd-kit/sortable';
import { createSlice, current } from '@reduxjs/toolkit';
import { LexoRank } from 'lexorank';
import dummyData from './dummyData';
import _ from 'lodash';
export interface Task {
  taskId: string;
  columnId: string;
  status: string;
  title: string;
  taskOrder: number;
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
export interface Board {
  boardId: string;
  boardTitle: string;
  columnOrderIds: string[];
}
export interface InitialState {
  // value: number;
  // board: Board;
  // taskMap: TaskMap;
  // columns: ColumnMap;
  // tasksFromApi: Array<TaskFromApi>;
  // tasksByStatus: TasksByStatus;
  taskMap: Record<string, any>;
  columnMap: any;
  // statusMap: any;
}
// Todo resolve any here
export interface TasksByStatus {
  [key: string]: TaskFromApi[] | any;
}
export interface TaskFromApi {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  DueDate: string;
  StartDate: string;
  Status: string;
  Priority: string;
  Color: string;
  Cost: null;
  Hour: number;
  Assignee: string;
  Team: string | null;
  CreatedDate: string;
  CreatedById: string;
  Description: string | null;
  LastModifiedDate: string;
  LastModifiedById: string;
  Project: string;
  taskRank?: string;
  colRank?: string;
  tasks?: TaskFromApi[];
}

const initialState = {
  taskMap: {},
  columnMap: {},
  statusMap: {},
} as InitialState;

let start = LexoRank.middle();

export const kanbanSlice = createSlice({
  name: 'Kanban',
  initialState: initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },

    // createNewColumn: (state, action) => {
    //   const { columnId, columnTitle, taskIds } = action.payload;
    //   state.columns[columnId] = { columnId: columnId, columnTitle, taskIds };
    //   state.board.columnOrderIds.push(columnId);
    // },
    // handleSwapColumns: (state, action) => {},
    // // Not useable yet
    // handleMoveColumns: (state, action) => {
    //   const { oldIndex, newIndex } = action.payload;
    //   const newColumnOrderIds = arrayMove(state.board.columnOrderIds, oldIndex, newIndex);
    //   state.board.columnOrderIds = newColumnOrderIds;
    // },
    // handleMoveCardInsideColumn: (state, action) => {
    //   const { colId, oldTaskIndex, newTaskIndex } = action.payload;
    //   const column = state.columns[colId];
    //   const newTaskIds = arrayMove(column.taskIds, oldTaskIndex, newTaskIndex);
    //   state.columns[colId].taskIds = newTaskIds;
    //   console.log(current(state.columns));
    // },
    // handleMoveCardToAnotherColumn: (state, action) => {
    //   const { oldColId, newColId, oldIndex, newIndex } = action.payload;
    //   const oldColumn = state.columns[oldColId];
    //   const newColumn = state.columns[newColId];
    //   const newOldTaskIds = [...oldColumn.taskIds];
    //   const newNewTaskIds = [...newColumn.taskIds];
    //   const [removed] = newOldTaskIds.splice(oldIndex, 1);
    //   newNewTaskIds.splice(newIndex, 0, removed);
    //   state.columns[oldColId].taskIds = newOldTaskIds;
    //   state.columns[newColId].taskIds = newNewTaskIds;
    //   const task = state.taskMap[removed];
    //   state.taskMap[removed] = { ...task, columnId: newColId };

    //   console.log(current(state.columns));
    // },
    // handleDragTaskOverColumn: (state, action) => {
    //   const { oldColId, newColId, oldIndex, newIndex } = action.payload;
    //   // Change current dragging task columnID to the over columnID
    //   const oldColumn = state.columns[oldColId];
    //   const newColumn = state.columns[newColId];
    //   const newOldTaskIds = [...oldColumn.taskIds];
    //   const newNewTaskIds = [...newColumn.taskIds];
    //   const [removed] = newOldTaskIds.splice(oldIndex, 1);
    //   newNewTaskIds.splice(newIndex, 0, removed);
    //   state.columns[oldColId].taskIds = newOldTaskIds;
    //   state.columns[newColId].taskIds = newNewTaskIds;
    //   const task = state.taskMap[removed];
    //   state.taskMap[removed] = { ...task, columnId: newColId };
    //   console.log(current(state.columns));
    // },
    // handleDragTaskOverEmptyColumn: (state, action) => {
    //   const { oldColId, newColId, oldIndex, newIndex } = action.payload;
    //   // Change current dragging task columnID to the over columnID
    //   const oldColumn = state.columns[oldColId];
    //   const newColumn = state.columns[newColId];
    //   const newOldTaskIds = [...oldColumn.taskIds];
    //   const newNewTaskIds = [...newColumn.taskIds];
    //   const [removed] = newOldTaskIds.splice(oldIndex, 1);
    //   newNewTaskIds.splice(newIndex, 0, removed);
    //   state.columns[oldColId].taskIds = newOldTaskIds;
    //   state.columns[newColId].taskIds = newNewTaskIds;
    //   const task = state.taskMap[removed];
    //   state.taskMap[removed] = { ...task, columnId: newColId };
    //   console.log(current(state.columns));
    // },
    // // New code here
    // parseDataOnFirstLoad: (state, action) => {
    //   state.tasksFromApi.forEach((task, index) => {
    //     start = start.genNext();
    //     if (!state.tasksByStatus[task.Status]) {
    //       state.tasksByStatus[task.Status] = {
    //         colRank: start.toString(),
    //         tasks: [],
    //       };
    //     }
    //     state.tasksByStatus[task.Status].tasks.push({ ...task, taskRank: start.toString() });
    //   });
    //   // console.log(current(state.tasksByStatus));
    // },
    // End new code

    fetchData: (state) => {
      const action = { payload: { ...dummyData } };
      const statusMap = _.keyBy(action.payload.statuses, 'value');
      state.taskMap = _.keyBy(action.payload.tasks, 'Id');
      // state.columnMap = _.keyBy(action.payload.columns, 'Id');
      for (const column of action.payload.columns) {
        const status = statusMap[column.Value];
        state.columnMap[column.Id] = {
          ...column,
          item: { ...status },
        };
      }
    },
  },
});

export const {
  // increment,
  // decrement,
  // incrementByAmount,
  // createNewColumn,
  // handleSwapColumns,
  // handleMoveColumns,
  // handleMoveCardInsideColumn,
  // handleMoveCardToAnotherColumn,
  // handleDragTaskOverColumn,
  // handleDragTaskOverEmptyColumn,
  // parseDataOnFirstLoad,
  fetchData,
} = kanbanSlice.actions;

export default kanbanSlice;
