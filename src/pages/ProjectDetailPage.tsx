import { useParams, useOutletContext } from "react-router-dom";
import type { OutletContextType } from "../types";
import { findProjectById } from "../utils/findProjectById";
import ProjectCard from "../components/ProjectCard";

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { projects, toggleTask, addTask } = useOutletContext<OutletContextType>();

  const project = findProjectById(projects, Number(id));

  if (!project) {
    return (
      <div className="text-center text-gray-400 mt-12">
        <p className="text-lg font-medium">Project not found</p>
        <p className="text-sm mt-1">It may have been removed, or the link is invalid.</p>
      </div>
    );
  }

  return (
    <div>
        <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-sm text-gray-400">{project.status}</p>
        <ProjectCard project={project} onToggleTask={toggleTask} onAddTask={addTask} />
       
    </div>
  );
}

export default ProjectDetailPage;