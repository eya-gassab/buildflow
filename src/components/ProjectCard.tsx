import { useState } from "react";
import type { Project } from "../types";
import { CheckCircle2, Circle } from "lucide-react";
import { AddTaskForm } from "./AddTaskForm";     

type TaskFilter = "all" | "todo" | "done";
const FILTER_TABS: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "done", label: "Done" },
];

function ProjectCard({ project, onToggleTask,onAddTask }: { 
  project: Project; 
  onToggleTask: (projectId: number, taskId: string) => void; 
  onAddTask: (projectId: number, title: string) => void;
}) {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const visibleTasks = project.tasks.filter((task) => {
    if (filter === "todo") return !task.completed;
    if (filter === "done") return task.completed;
    return true; // "all"
  });
  const totalTasks = project.tasks.length;
  const todoCount = totalTasks - completedTasks;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const emptyMessage =
    totalTasks === 0
    ? "No tasks yet. Add your first one below."
    : filter === "done"
      ? "No completed tasks yet."
      : "Nothing left to do. 🎉";
      
  const statusColor: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    "in progress": "bg-orange-100 text-orange-700",
    pending: "bg-gray-100 text-gray-500",
  };

  const tabCounts: Record<TaskFilter, number> = {
  all: totalTasks,
  todo: todoCount,
  done: completedTasks,
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">
          {project.name}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[project.status] ?? "bg-gray-100 text-gray-500"}`}
        >
          {project.status}
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filter === tab.value
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label} <span className="text-gray-400">{tabCounts[tab.value]}</span>
          </button>
        ))}
      </div>

      {/* Tasks */}
      {visibleTasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 py-6 text-center text-sm text-gray-400">
          {emptyMessage}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              {task.completed ? (
                <CheckCircle2 onClick={() => onToggleTask(project.id, task.id)} size={16} className="text-green-500 shrink-0" />
              ) : (
                <Circle onClick={() => onToggleTask(project.id, task.id)} size={16} className="text-gray-300 shrink-0" />
              )}
              <span className={task.completed ? "line-through text-gray-400" : ""}>
                {task.title}
              </span>
              <span className="ml-auto text-xs text-gray-400">
                {task.assignedTo}
              </span>
            </li>
          ))}
        </ul>
      )}                                          

      <AddTaskForm
        onAddTask={(title) => {
        onAddTask(project.id, title);
        setFilter("all"); //  make sure the new task is visible
        }}
      />
    </div>
  );
}

export default ProjectCard;
