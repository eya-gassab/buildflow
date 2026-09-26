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

export type SaveStatus = "idle" | "saving" | "saved";

export interface OutletContextType {
  projects: Project[];
  saveStatus: SaveStatus;
  toggleTask: (projectId: number, taskId: string) => void;
  addTask: (projectId: number, title: string) => void;
}