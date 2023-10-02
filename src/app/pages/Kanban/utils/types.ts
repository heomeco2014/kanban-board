export interface Task{
    taskId: string;
    columnId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
}

export interface Column  {
    columnId: string;
    columnTitle: string;
    taskIds: string[];
  };

export interface KanbanBoardProps{
    columns: Column[];
    tasks: Task[];
}