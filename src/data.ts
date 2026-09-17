import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    name: "Buildflow Dashboard",
    status: "in progress",
    tasks: [
      { id: "t1", title: "Set up Vite + React scaffold", completed: true, assignedTo: "Eya" },
      { id: "t2", title: "Define TypeScript types", completed: true, assignedTo: "Eya" },
      { id: "t3", title: "Build ProjectCard component", completed: false, assignedTo: "Eya" },
    ]
  },
  {
    id: 2,
    name: "Portfolio Website",
    status: "in progress",
    tasks: [
      { id: "t4", title: "Design landing section", completed: true, assignedTo: "Eya" },
      { id: "t5", title: "Write project descriptions", completed: false, assignedTo: "Eya" },
      { id: "t6", title: "Deploy to Vercel", completed: false, assignedTo: "Eya" },
    ]
  },
  {
    id: 3,
    name: "GeoStructGen Plugin",
    status: "completed",
    tasks: [
      { id: "t7", title: "LangGraph agent integration", completed: true, assignedTo: "Eya" },
      { id: "t8", title: "Revit parameter mapping", completed: true, assignedTo: "Eya" },
    ]
  }
];