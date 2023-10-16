import { LexoRank } from 'lexorank';

const initialState = {
  value: 4,
  board: {
    boardId: 'board-1',
    boardTitle: 'Board 1',
    columnOrderIds: ['column-1', 'column-2', 'column-3', 'column-4'],
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
};
let mapObj = {};
const tasksFromApi = [
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
    Cost: null,
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
    Cost: null,
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
];
let start = LexoRank.middle();
const columns = initialState.columns;
let tasksMap = structuredClone(tasksFromApi);
tasksMap.forEach((task, index) => {
  if (!mapObj[task.Status]) {
    mapObj[task.Status] = {
      colRank: start.toString(),
      tasks: [],
    };
  }
  mapObj[task.Status].tasks.push(task);
  start = start.genNext();
});
const newMapObject = {};

const object = Object.values(columns).map((col) => col.columnId);
const lexoRanks = {};

for (let i = 0; i < 10; i++) {
  lexoRanks[i] = LexoRank.middle().toString();
}

// console.log(
//   '🚀 ~ file: App.js:180 ~ mapObj:',
//   Object.keys(mapObj).map((key) => mapObj[key]),
// );
const columns2 = [
  { Id: 'ColumnId-1', Name: '1', Type: 'Status', Value: 'Not Started', Color: '#3B82F6', max: 10, Rank: 1 },
  { Id: 'ColumnId-2', Name: '2', Type: 'Status', Value: 'In progress', Color: '#3B82F6', max: 10, Rank: 2 },
  { Id: 'ColumnId-3', Name: '3', Type: 'Status', Value: 'Review', Color: '#3B82F6', max: 10, Rank: 3 },
  { Id: 'ColumnId-4', Name: '4', Type: 'Status', Value: 'Completed', Color: '#3B82F6', max: 10, Rank: 4 },
  { Id: 'ColumnId-5', Name: '5', Type: 'Status', Value: 'Invalid', Color: '#3B82F6', max: 10, Rank: -1 },
];
const sortedCols = columns2.sort((a: any, b: any) => {
  if (a.Rank && !b.Rank) return -1;
  if (!a.Rank && b.Rank) return 1;
  if (!a.Rank && !b.Rank) return 0;
  return -a.Rank + b.Rank;
});
console.log('🚀 ~ file: App.tsx:209 ~ sortedCols ~ sortedCols:', sortedCols);
