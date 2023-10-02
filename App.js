const initialState = {
  taskMap: {
    Id1: { id: 'Id1', columnId: 1, status: 'todo', title: 'abcd' },
    Id2: { id: 'Id2', columnId: 1, status: 'todo', title: 'bcd' },
    Id3: { id: 'Id3', columnId: 1, status: 'todo', title: 'fes' },
    Id4: { id: 'Id4', columnId: 2, status: 'inprogress', title: 'hlb' },
    Id5: { id: 'Id5', columnId: 2, status: 'inprogress', title: 'vvv' },
    Id6: { id: 'Id6', columnId: 2, status: 'inprogress', title: 'adfdf' },
    Id7: { id: 'Id7', columnId: 3, status: 'done', title: 'th' },
    Id8: { id: 'Id8', columnId: 3, status: 'done', title: 'sks' },
    Id9: { id: 'Id9', columnId: 3, status: 'done', title: 'acsa' },
  },
  columns: [
    { id: 1, title: 'Todo', taskIds: ['Id1', 'Id2', 'Id3'] },
    { id: 2, title: 'In Progress', taskIds: ['Id4', 'Id5', 'Id6'] },
    { id: 3, title: 'Done', taskIds: ['Id7', 'Id8', 'Id9'] },
  ],
};

console.log(initialState.taskMap['Id1']);
