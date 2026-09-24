export interface Task {
  id:string;
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

export interface OutletContextType {
  projects: Project[];
  toggleTask: (projectId: number, taskId: string) => void;
  addTask: (projectId: number, title: string) => void;
}