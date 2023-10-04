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

const columns = initialState.columns;
const object = Object.values(columns).map((col) => col.columnId);
console.log(object);
