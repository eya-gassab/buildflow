import type { Project } from "../types";
import ProjectCard from "./ProjectCard";


function ProjectsList({ projects, onToggleTask }: { projects: Project[]; onToggleTask: (projectId: number, taskId: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} onToggleTask={onToggleTask} />
      ))}
    </div>
  );
}


export default ProjectsList;