import type { Project } from "../types";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

function ProjectCard({ project }: { project: Project }) {
  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const statusColor: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    "in progress": "bg-orange-100 text-orange-700",
    pending: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
      {/* Header */}
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

      {/* Tasks */}
      <ul className="flex flex-col gap-2">
        {project.tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            {task.completed ? (
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
            ) : (
              <Circle size={16} className="text-gray-300 shrink-0" />
            )}
            <span
              className={task.completed ? "line-through text-gray-400" : ""}
            >
              {task.title}
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {task.assignedTo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectCard;
