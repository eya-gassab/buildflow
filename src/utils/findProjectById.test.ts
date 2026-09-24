import { describe, it, expect } from "vitest";
import { findProjectById } from "./findProjectById";
import type { Project } from "../types";

const mockProjects: Project[] = [
  { id: 1, name: "Project A", status: "active", tasks: [] },
  { id: 2, name: "Project B", status: "active", tasks: [] },
];

describe("findProjectById", () => {
  it("returns the matching project", () => {
    expect(findProjectById(mockProjects, 1)).toEqual(mockProjects[0]);
  });

  it("returns undefined when no id matches", () => {
    expect(findProjectById(mockProjects, 999)).toBeUndefined();
  });

  it("returns undefined for NaN (invalid :id in URL)", () => {
    expect(findProjectById(mockProjects, NaN)).toBeUndefined();
  });
});