import { describe, it, expect } from "vitest";
import { filterTasks } from "./filterTasks";
import type { Task } from "../types";

const sampleTasks: Task[] = [
  { id: "1", title: "Design logo", completed: true, assignedTo: "Eya" },
  { id: "2", title: "Write specs", completed: false, assignedTo: "Sam" },
  { id: "3", title: "Review code", completed: true, assignedTo: "Sam" },
];

describe("filterTasks", () => {
  it("returns all tasks when filter is 'all'", () => {
    const result = filterTasks(sampleTasks, "all");
    expect(result).toEqual(sampleTasks);
  });

  it("returns only incomplete tasks when filter is 'todo'", () => {
    const result = filterTasks(sampleTasks, "todo");
    expect(result).toEqual([
      { id: "2", title: "Write specs", completed: false, assignedTo: "Sam" },
    ]);
  });

  it("returns only completed tasks when filter is 'done'", () => {
    const result = filterTasks(sampleTasks, "done");
    expect(result).toEqual([
      { id: "1", title: "Design logo", completed: true, assignedTo: "Eya" },
      { id: "3", title: "Review code", completed: true, assignedTo: "Sam" },
    ]);
  });

  it("returns an empty array when there are no tasks", () => {
    expect(filterTasks([], "all")).toEqual([]);
    expect(filterTasks([], "todo")).toEqual([]);
    expect(filterTasks([], "done")).toEqual([]);
  });

  it("does not mutate the original tasks array", () => {
    const original = [...sampleTasks];
    filterTasks(sampleTasks, "done");
    expect(sampleTasks).toEqual(original);
  });
});
