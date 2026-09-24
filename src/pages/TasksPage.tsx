import { useOutletContext } from "react-router-dom";
import type { OutletContextType } from "../types";
import { CheckCircle2, Circle } from "lucide-react";

function TasksPage() {
    const{ projects, toggleTask } = useOutletContext<OutletContextType>();

    const allTasks = projects.flatMap(project =>
        project.tasks.map(task => ({
            ...task,
            projectId: project.id,
            projectName: project.name,
        }))
    );

    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-gray-900">All Tasks</h1>

            {allTasks.length === 0 ? (
        <p className="text-sm text-gray-400">No tasks yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {allTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl px-4 py-2.5"
            >
              {task.completed ? (
                <CheckCircle2
                  onClick={() => toggleTask(task.projectId, task.id)}
                  size={16}
                  className="text-green-500 shrink-0 cursor-pointer"
                />
              ) : (
                <Circle
                  onClick={() => toggleTask(task.projectId, task.id)}
                  size={16}
                  className="text-gray-300 shrink-0 cursor-pointer"
                />
              )}
              <span className={task.completed ? "line-through text-gray-400" : ""}>
                {task.title}
              </span>
              <span className="ml-auto text-xs text-gray-400">{task.projectName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksPage;