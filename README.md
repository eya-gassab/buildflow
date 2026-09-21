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

### Architecture Notes
- All project/task state lives in `Dashboard` (single source of truth)
- `AddTaskForm` is a controlled input component — React owns the text, not the DOM
- New tasks are appended immutably; state is never mutated directly

## Progress Log

- **Day 1** — Vite + React + TS scaffold, first component, GitHub setup
- **Day 2** — TypeScript types (`Project`, `Task`), props-based component tree (Dashboard → ProjectsList → ProjectCard)
- **Day 3** — State management with `useState`, event handling (`onClick`), immutable state updates. Task checkboxes are now interactive — toggling completion updates the UI and progress bars live.
- **Day 4** — Controlled inputs, form submission handling, immutable state append. Added `AddTaskForm` — a controlled input that collects a task title and sends it up via props. `addTask` in Dashboard builds the Task object and appends it immutably. New tasks appear live in the correct project card.

## Run locally

```bash
npm install
npm run dev
```