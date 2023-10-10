export interface TaskMap {
  [key: string]: Task;
}
export interface Task {
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

export interface ColumnMap {
  [key: string]: Column;
}
export interface Column {
  Id: string;
  Name: string;
  Type: string;
  Value: string;
  Color: string;
  max: number;
  Rank: string;
}

export interface StatusMap {
  [key: string]: Status | any;
}
export interface Status {
  attributes?: string;
  label: string;
  validFor: any;
  value: string;
}
export interface InitialState {
  taskMap: TaskMap;
  columnMap: ColumnMap;
  statusMap: StatusMap;
  state: {
    activeDragItemType: string;
    activeDragItemId: string;
  };
}

export type TasksByStatus = Record<string, string[]>;
export interface columnMapStatus {
  [key: string]: string;
}
