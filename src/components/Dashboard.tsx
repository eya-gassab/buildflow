import type { Project } from "../types";
import { projects } from "../data";
import ProjectsList from "./ProjectsList";
import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";

function Dashboard() {
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneTasks = projects.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col gap-1 px-3 py-6 shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-4">Buildflow</p>
        <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" active />
        <NavItem icon={<FolderKanban size={16} />} label="Projects" />
        <NavItem icon={<Settings size={16} />} label="Settings" />
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-8 flex flex-col gap-6">

        {/* Header */}
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

        {/* Projects grid */}
        <ProjectsList projects={projects} />

      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors
      ${active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`}>
      {icon}
      {label}
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

export default Dashboard;