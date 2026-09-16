import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    name: "Buildflow Dashboard",
    status: "in progress",
    tasks: [
      { title: "Set up Vite + React scaffold", completed: true, assignedTo: "Eya" },
      { title: "Define TypeScript types", completed: true, assignedTo: "Eya" },
      { title: "Build ProjectCard component", completed: false, assignedTo: "Eya" },
    ]
  },
  {
    id: 2,
    name: "Portfolio Website",
    status: "in progress",
    tasks: [
      { title: "Design landing section", completed: true, assignedTo: "Eya" },
      { title: "Write project descriptions", completed: false, assignedTo: "Eya" },
      { title: "Deploy to Vercel", completed: false, assignedTo: "Eya" },
    ]
  },
  {
    id: 3,
    name: "GeoStructGen Plugin",
    status: "completed",
    tasks: [
      { title: "LangGraph agent integration", completed: true, assignedTo: "Eya" },
      { title: "Revit parameter mapping", completed: true, assignedTo: "Eya" },
    ]
  }
];