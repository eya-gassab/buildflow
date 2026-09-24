import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";
import { useState } from "react";
import type { Project, Task, OutletContextType } from "../types";
import { projects as initialProjects } from "../data";

function Layout() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const toggleTask = (projectId: number, taskId: string) => {
    setProjects(prevProjects => prevProjects.map(project =>
      project.id !== projectId
        ? project
        : {
            ...project,
            tasks: project.tasks.map(task =>
              task.id !== taskId
                ? task
                : { ...task, completed: !task.completed }
            )
          }
    ));
  };

  const addTask = (projectId: number, title: string): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
      assignedTo: "",
    };
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id !== projectId
          ? project
          : { ...project, tasks: [...project.tasks, newTask] }
      )
    );
  };
  const contextValue: OutletContextType = {
    projects,
    toggleTask,
    addTask,
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col gap-1 px-3 py-6 shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-4">Buildflow</p>
        <NavItem to="/" icon={<LayoutDashboard size={16} />} label="Dashboard" />
        <NavItem to="/projects" icon={<FolderKanban size={16} />} label="Projects" />
        <NavItem to="/settings" icon={<Settings size={16} />} label="Settings" />
      </aside>

      <main className="flex-1 px-8 py-8 flex flex-col gap-6">
        <Outlet context={contextValue} />
      </main>
    </div>
  );
}


function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors
        ${isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"}`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

export default Layout;