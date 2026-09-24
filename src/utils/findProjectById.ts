import type { Project } from "../types"

export function findProjectById(projects: Project[], id: number): Project | undefined {
    return projects.find(project => project.id ===id );
}  