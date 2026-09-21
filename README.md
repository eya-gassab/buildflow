# Buildflow — Project Management Dashboard

A project management dashboard built with React, Vite, TypeScript and Tailwind CSS.
Built as a structured 7-day learning project — production-quality UI, real architectural patterns.

## Stack

- React 18 + Vite
- TypeScript (strict mode)
- Tailwind CSS v4
- Lucide React (icons)

## Features

### Task Management
- Toggle task completion — click the circle icon on any task
- Add new tasks — type in the input at the bottom of any project card and press Enter or click +
- Progress bar updates in real time on both actions

### Task Filtering
- All / To Do / Done tabs on every project card, each with a live count
- Each card filters independently
- Empty states with context-aware messages: "no tasks yet" vs. "nothing matches this filter"
- Adding a task switches the card back to "All" so the new task is always visible

### Architecture Notes
- All project/task state lives in `Dashboard` (single source of truth)
- `AddTaskForm` is a controlled input component — React owns the text, not the DOM
- New tasks are appended immutably; state is never mutated directly
- Derived state: `visibleTasks`, progress, tab counts and empty messages are computed on every render, never stored in `useState`
- Filtering uses `.filter()` on a copy of the view; the source `project.tasks` is never modified

| State | Lives in | Why |
|---|---|---|
| `projects` | `Dashboard` | shared data, changed by toggle and add |
| `filter` | `ProjectCard` | local UI choice, only affects one card |

## Progress Log

- **Day 1** — Vite + React + TS scaffold, first component, GitHub setup
- **Day 2** — TypeScript types (`Project`, `Task`), props-based component tree (Dashboard → ProjectsList → ProjectCard)
- **Day 3** — State management with `useState`, event handling (`onClick`), immutable state updates. Task checkboxes are now interactive — toggling completion updates the UI and progress bars live.
- **Day 4** — Controlled inputs, form submission handling, immutable state append. Added `AddTaskForm` — a controlled input that collects a task title and sends it up via props. `addTask` in Dashboard builds the Task object and appends it immutably. New tasks appear live in the correct project card.
- **Day 5** — Derived state and conditional rendering. Added All / To Do / Done filter tabs with live counts, local per-card filter state, and context-aware empty states. Full decision rationale in the decision log.

## Run locally

```bash
npm install
npm run dev
```