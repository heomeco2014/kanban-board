import { TaskFromApi } from "../redux/kanbanSlice";

export interface Task{
    taskId: string;
    columnId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
}

export interface Column  {
   colRank: string;
   tasks: TaskFromApi[];
  };

export interface KanbanBoardProps{
    columns: Column[];
    tasks: Task[];
}