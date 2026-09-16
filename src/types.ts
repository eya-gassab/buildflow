export interface Task {
  title: string;
  completed: boolean;
  assignedTo: string;
}

export interface Project {
  id: number;
  name: string;
  status: string;
  tasks: Task[];
}