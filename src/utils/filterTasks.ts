import type { Task } from "../types";

export type TaskFilter = "all" | "todo" | "done";

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return tasks.filter((task) => {
    if (filter === "todo") return !task.completed;
    if (filter === "done") return task.completed;
    return true;
  });
}