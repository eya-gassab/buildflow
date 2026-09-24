import { useOutletContext } from "react-router-dom";
import type { OutletContextType } from "../types";
import ProjectsList from "../components/ProjectsList";

function ProjectsPage() {
  const { projects, toggleTask, addTask } = useOutletContext<OutletContextType>();

  return (
    <ProjectsList projects={projects} onToggleTask={toggleTask} onAddTask={addTask} />
  );
}

export default ProjectsPage;