import { arrayMove, arraySwap } from '@dnd-kit/sortable';
import { createSlice, current } from '@reduxjs/toolkit';
import { LexoRank } from 'lexorank';
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
  value: number;
  board: Board;
  taskMap: TaskMap;
  columns: ColumnMap;
  tasksFromApi: Array<TaskFromApi>;
  tasksByStatus: TasksByStatus;
}

export interface TasksByStatus {
  [key: string]: TaskFromApi[];
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
  Rank?: string;
}

const initialState = {
  value: 4,
  board: {
    boardId: 'board-1',
    boardTitle: 'Board 1',
    columnOrderIds: ['column-2', 'column-1', 'column-3', 'column-4'],
  },
  columns: {
    'column-1': { columnId: 'column-1', columnTitle: 'Todo 1', taskIds: ['task-1', 'task-2', 'task-3', 'task-4'] },
    'column-2': { columnId: 'column-2', columnTitle: 'In Progress 2', taskIds: ['task-5', 'task-6'] },
    'column-3': { columnId: 'column-3', columnTitle: 'Done 3', taskIds: [] },
    'column-4': { columnId: 'column-4', columnTitle: 'Column 4', taskIds: ['task-7', 'task-8', 'task-9'] },
  },
  taskMap: {
    'task-1': { taskId: 'task-1', columnId: 'column-1', taskOrder: 1, status: 'todo', title: 'abcd' },
    'task-2': { taskId: 'task-2', columnId: 'column-1', taskOrder: 2, status: 'todo', title: 'bcd' },
    'task-3': { taskId: 'task-3', columnId: 'column-1', taskOrder: 3, status: 'todo', title: 'fes' },
    'task-4': { taskId: 'task-4', columnId: 'column-1', taskOrder: 4, status: 'todo', title: 'hlb' },
    'task-5': { taskId: 'task-5', columnId: 'column-2', taskOrder: 2, status: 'inprogress', title: 'vvv' },
    'task-6': { taskId: 'task-6', columnId: 'column-2', taskOrder: 3, status: 'inprogress', title: 'adfdf' },
    'task-7': { taskId: 'task-7', columnId: 'column-4', taskOrder: 1, status: 'done', title: 'th' },
    'task-8': { taskId: 'task-8', columnId: 'column-4', taskOrder: 2, status: 'done', title: 'sks' },
    'task-9': { taskId: 'task-9', columnId: 'column-4', taskOrder: 3, status: 'done', title: 'acsa' },
  },

  tasksFromApi: [
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y000007qBoFEAU',
      },
      Id: 'a0A1y000007qBoFEAU',
      Name: 'New task',
      DueDate: '2023-09-27',
      StartDate: '2023-09-26',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: undefined,
      Hour: 8,
      Assignee: '0051y00000NlOGQAA3',
      Team: null,
      CreatedDate: '2023-09-25T06:38:43.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-09-25T06:38:43.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y000007qBoAEAU',
      },
      Id: 'a0A1y000007qBoAEAU',
      Name: 'New task',
      DueDate: '2023-09-30',
      StartDate: '2023-09-29',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: undefined,
      Hour: 8,
      Assignee: null,
      Team: 'a0C1y0000028W8iEAE',
      CreatedDate: '2023-09-25T06:38:42.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-09-25T06:38:46.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y000007qBoKEAU',
      },
      Id: 'a0A1y000007qBoKEAU',
      Name: 'New task',
      DueDate: '2023-09-27',
      StartDate: '2023-09-26',
      Status: 'Done',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: null,
      Team: 'a0C1y0000028W8sEAE',
      CreatedDate: '2023-09-25T06:38:43.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-09-25T06:38:43.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y0000080HV1EAM',
      },
      Id: 'a0A1y0000080HV1EAM',
      Name: 'New task',
      DueDate: '2023-10-04',
      StartDate: '2023-10-04',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: '0051y00000NlOGVAA3',
      Team: null,
      CreatedDate: '2023-10-03T02:21:04.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-10-03T02:21:04.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y0000080HUxEAM',
      },
      Id: 'a0A1y0000080HUxEAM',
      Name: 'New task',
      DueDate: '2023-10-04',
      StartDate: '2023-10-04',
      Status: 'In Progress',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: '0051y00000NlOGVAA3',
      Team: null,
      CreatedDate: '2023-10-03T02:20:56.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-10-03T02:20:56.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
    {
      attributes: {
        type: 'com_devsamurai__TeamBoard_Task__c',
        url: '/services/data/v57.0/sobjects/com_devsamurai__TeamBoard_Task__c/a0A1y0000080HUwEAM',
      },
      Id: 'a0A1y0000080HUwEAM',
      Name: 'New task',
      DueDate: '2023-10-04',
      StartDate: '2023-10-04',
      Status: 'Not Started',
      Priority: 'Normal',
      Color: '#3B82F6',
      Cost: null,
      Hour: 8,
      Assignee: '0051y00000NlOGYAA3',
      Team: null,
      CreatedDate: '2023-10-03T02:20:39.000+0000',
      CreatedById: '0051y00000NpONKAA3',
      Description: null,
      LastModifiedDate: '2023-10-03T02:20:39.000+0000',
      LastModifiedById: '0051y00000NpONKAA3',
      Project: 'a081y000004GhyeAAC',
    },
  ],
  tasksByStatus: {},
} as InitialState;
let start = LexoRank.middle();

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
      state.board.columnOrderIds.push(columnId);
    },
    handleSwapColumns: (state, action) => {},
    // Not useable yet
    handleMoveColumns: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const newColumnOrderIds = arrayMove(state.board.columnOrderIds, oldIndex, newIndex);
      state.board.columnOrderIds = newColumnOrderIds;
    },
    handleMoveCardInsideColumn: (state, action) => {
      const { colId, oldTaskIndex, newTaskIndex } = action.payload;
      const column = state.columns[colId];
      const newTaskIds = arrayMove(column.taskIds, oldTaskIndex, newTaskIndex);
      state.columns[colId].taskIds = newTaskIds;
      console.log(current(state.columns));
    },
    handleMoveCardToAnotherColumn: (state, action) => {
      const { oldColId, newColId, oldIndex, newIndex } = action.payload;
      const oldColumn = state.columns[oldColId];
      const newColumn = state.columns[newColId];
      const newOldTaskIds = [...oldColumn.taskIds];
      const newNewTaskIds = [...newColumn.taskIds];
      const [removed] = newOldTaskIds.splice(oldIndex, 1);
      newNewTaskIds.splice(newIndex, 0, removed);
      state.columns[oldColId].taskIds = newOldTaskIds;
      state.columns[newColId].taskIds = newNewTaskIds;
      const task = state.taskMap[removed];
      state.taskMap[removed] = { ...task, columnId: newColId };

      console.log(current(state.columns));
    },
    handleDragTaskOverColumn: (state, action) => {
      const { oldColId, newColId, oldIndex, newIndex } = action.payload;
      // Change current dragging task columnID to the over columnID
      const oldColumn = state.columns[oldColId];
      const newColumn = state.columns[newColId];
      const newOldTaskIds = [...oldColumn.taskIds];
      const newNewTaskIds = [...newColumn.taskIds];
      const [removed] = newOldTaskIds.splice(oldIndex, 1);
      newNewTaskIds.splice(newIndex, 0, removed);
      state.columns[oldColId].taskIds = newOldTaskIds;
      state.columns[newColId].taskIds = newNewTaskIds;
      const task = state.taskMap[removed];
      state.taskMap[removed] = { ...task, columnId: newColId };
      console.log(current(state.columns));
    },
    handleDragTaskOverEmptyColumn: (state, action) => {
      const { oldColId, newColId, oldIndex, newIndex } = action.payload;
      // Change current dragging task columnID to the over columnID
      const oldColumn = state.columns[oldColId];
      const newColumn = state.columns[newColId];
      const newOldTaskIds = [...oldColumn.taskIds];
      const newNewTaskIds = [...newColumn.taskIds];
      const [removed] = newOldTaskIds.splice(oldIndex, 1);
      newNewTaskIds.splice(newIndex, 0, removed);
      state.columns[oldColId].taskIds = newOldTaskIds;
      state.columns[newColId].taskIds = newNewTaskIds;
      const task = state.taskMap[removed];
      state.taskMap[removed] = { ...task, columnId: newColId };
      console.log(current(state.columns));
    },
    // New code here
    parseDataOnFirstLoad: (state, action) => {
      state.tasksFromApi.forEach((task, index) => {
        if (!state.tasksByStatus[task.Status]) {
          state.tasksByStatus[task.Status] = [];
        }
        start = start.genNext();
        state.tasksByStatus[task.Status].push({ ...task, Rank: start.toString() });
      });
      console.log(current(state.tasksByStatus));
    },
    // End new code
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  createNewColumn,
  handleSwapColumns,
  handleMoveColumns,
  handleMoveCardInsideColumn,
  handleMoveCardToAnotherColumn,
  handleDragTaskOverColumn,
  handleDragTaskOverEmptyColumn,
  parseDataOnFirstLoad,
} = kanbanSlice.actions;

export default kanbanSlice;
