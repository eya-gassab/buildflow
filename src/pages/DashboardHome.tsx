import { useOutletContext } from "react-router-dom";
import type { OutletContextType } from "../types";

function DashboardHome() {
  const { projects } = useOutletContext<OutletContextType>();

  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneTasks = projects.reduce(
    (acc, p) => acc + p.tasks.filter(t => t.completed).length,
    0
  );

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Track your projects and tasks</p>
      </div>
      <div className="flex gap-4 text-sm">
        <Stat label="Projects" value={projects.length} />
        <Stat label="Tasks Done" value={`${doneTasks}/${totalTasks}`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
      <p className="text-lg font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

export default DashboardHome;