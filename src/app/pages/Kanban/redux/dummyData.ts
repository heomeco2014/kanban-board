import { LexoRank } from 'lexorank';
import _ from 'lodash';
let tasks = [
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
    Rank: '0|i00007:',
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
    Rank: '0|i0000f:',
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
    Rank: '0|i0000n:',
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
    Rank: '0|i0000v:',
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
    Status: 'In progress',
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
    Rank: '0|i00013:',
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
    Status: 'Review',
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
    Rank: '0|i0001b:',
  },
];
const statuses = [
  {
    attributes: null,
    label: 'Not Started',
    validFor: [],
    value: 'Not Started',
  },
  {
    attributes: null,
    label: 'In progress',
    validFor: [],
    value: 'In progress',
  },
  {
    attributes: null,
    label: 'Review',
    validFor: [],
    value: 'Review',
  },
  {
    attributes: null,
    label: 'Completed',
    validFor: [],
    value: 'Completed',
  },
  {
    attributes: null,
    label: 'Invalid',
    validFor: [],
    value: 'Invalid',
  },
];

const columns = [
  { Id: 'ColumnId-1', Name: '1', Type: 'Status', Value: 'Not Started', Color: '#3B82F6', max: 10, Rank: '0|i00007:' },
  { Id: 'ColumnId-2', Name: '2', Type: 'Status', Value: 'In progress', Color: '#3B82F6', max: 10, Rank: '0|i0000f:' },
  { Id: 'ColumnId-3', Name: '3', Type: 'Status', Value: 'Review', Color: '#3B82F6', max: 10, Rank: '0|i0000n:' },
  { Id: 'ColumnId-4', Name: '4', Type: 'Status', Value: 'Completed', Color: '#3B82F6', max: 10, Rank: '0|i0000v:' },
  { Id: 'ColumnId-5', Name: '5', Type: 'Status', Value: 'Invalid', Color: '#3B82F6', max: 10, Rank: '0|hzzzzz' },
];

export default {
  tasks,
  statuses,
  columns,
};
let tasks2 = [
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
    Rank: '0|i00007:',
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
    Rank: '0|i0000f:',
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
    Rank: '0|i0000n:',
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
    Rank: '0|i0000v:',
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
    Status: 'In progress',
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
    Rank: '0|i00013:',
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
    Status: 'Review',
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
    Rank: '0|i0001b:',
  },
];
const columns2 = [
  { Id: 'ColumnId-1', Name: '1', Type: 'Status', Value: 'Not Started', Color: '#3B82F6', max: 10, Rank: '0|i00007:' },
  { Id: 'ColumnId-2', Name: '2', Type: 'Status', Value: 'In progress', Color: '#3B82F6', max: 10, Rank: '0|i0000f:' },
  { Id: 'ColumnId-3', Name: '3', Type: 'Status', Value: 'Review', Color: '#3B82F6', max: 10, Rank: '0|i0000n:' },
  { Id: 'ColumnId-4', Name: '4', Type: 'Status', Value: 'Completed', Color: '#3B82F6', max: 10, Rank: '0|i0000v:' },
  { Id: 'ColumnId-5', Name: '5', Type: 'Status', Value: 'Invalid', Color: '#3B82F6', max: 10, Rank: '0|hzzzzz' },
];
const statuses2 = [
  {
    attributes: null,
    label: 'Not Started',
    validFor: [],
    value: 'Not Started',
  },
  {
    attributes: null,
    label: 'In progress',
    validFor: [],
    value: 'In progress',
  },
  {
    attributes: null,
    label: 'Review',
    validFor: [],
    value: 'Review',
  },
  {
    attributes: null,
    label: 'Completed',
    validFor: [],
    value: 'Completed',
  },
  {
    attributes: null,
    label: 'Invalid',
    validFor: [],
    value: 'Invalid',
  },
];

const groupBy = ({ taskMap, columnMap }: any) => {
  const tasksByStatus: any = {
    // "Not Started": ["task1", "task2"]
  };

  const columnMapStatus: any = {};
  for (const key in columnMap) {
    const column = columnMap[key];
    if (!columnMapStatus[column.Value]) columnMapStatus[column.Value] = column.Id;
    tasksByStatus[column.Id] = [];
  }

  for (const _task of tasks) {
    const task = _task as any;
    const status = task.Status;

    const columnId = columnMapStatus[status];
    if (!!columnId) {
      if (!tasksByStatus[columnId]) tasksByStatus[columnId] = [];
      tasksByStatus[columnId].push(task.Id);
    }
  }
  return {
    tasksByStatus,
  };
};

const statusMap = _.keyBy(statuses2, 'value');
const taskMap = _.keyBy(tasks2, 'Id');
console.log('🚀 ~ file: dummyData.ts:410 ~ taskMap:', taskMap);
