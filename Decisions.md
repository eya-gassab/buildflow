## [Day 1] Decision: Component export style

**Context:** export keyword pattern
**Options considered:** Named export or Default export
**Decision:** default is more common
**Reasoning:** export isn't a function call, it's a special keyword-pattern
**Revisit when:** export / import errors

## [Day 2] Props, TypeScript Types & UI Shell

### Decisions

- Separated types into `src/types.ts` and data into `src/data.ts` — keeps concerns clean, scalable
- Used `interface` over `type` for Project/Task — cleaner syntax for plain object shapes
- Used `import type` everywhere types are imported — required by `verbatimModuleSyntax` in Vite/TS
- Installed Tailwind CSS v4 via `@tailwindcss/vite` plugin — zero config, fastest setup
- Installed `lucide-react` for icons — replaces emojis, consistent and production-grade
- Cards rendered in a responsive 3-column grid (1 col mobile → 2 → 3)

### Architecture

- Data flows: `data.ts` → `Dashboard` → `ProjectsList` → `ProjectCard`
- Each hop is a typed prop — TS enforces shape at every level
- `ProjectCard` computes progress locally from its own prop (no external state needed yet)
- `Dashboard` computes global stats (total projects, tasks done) from the same array

## Day 3: useState + events

- made checkboxes interactive, progress bar updates live

## Day 4 : controlled input, immutable append, and prop-drilled addTask

### Controlled input for AddTaskForm

- Decision: title state lives locally in AddTaskForm, not in Dashboard
- Reason: no other component needs the draft text; lifting it would cause
  unnecessary re-renders across the whole app on every keystroke

### onAddTask receives string, not Task object

- Decision: AddTaskForm is kept ignorant of the Task type
- Reason: separates concerns — form collects text, Dashboard builds objects;
  makes the form reusable in any context

### ProjectCard wraps onAddTask with project.id

- Decision: (title) => onAddTask(project.id, title)
- Reason: AddTaskForm has no access to projectId;
  ProjectCard is the correct scope where both exist

### crypto.randomUUID() for Task ids

- Decision: browser built-in, no library needed
- Reason: Task.id is string, UUIDs are collision-safe, zero dependencies added

## Day 5: Derived State & Conditional Rendering

### Derive `visibleTasks` instead of storing it

- **Options:** (a) store filtered tasks in `useState`, (b) compute from `project.tasks` + `filter` on render
- **Chose:** (b)
- **Why:** one source of truth. Option (a) needs manual syncing after every toggle or add, and filtering the stored array would destroy data when switching tabs.
- **Trade-off:** recomputed every render. Negligible at this scale; `useMemo` only if profiling shows a need.

### Keep `filter` local to `ProjectCard`

- **Options:** (a) lift to `Dashboard`, (b) local state per card
- **Chose:** (b)
- **Why:** only that card's tabs and list read it. Lifting would force prop drilling and make all cards share one filter.
- **Revisit if:** a global "show only To Do" control is needed.

### Union type `TaskFilter` instead of `string`

- **Chose:** `"all" | "todo" | "done"`
- **Why:** TypeScript rejects typos at compile time, and `Record<TaskFilter, number>` forces every tab to have a count.

### Tabs from a `FILTER_TABS` config array

- **Why:** adding a tab is one line, not new JSX. Defined outside the component because it never changes.

### Two distinct empty states

- **Why:** an empty list has two causes: no tasks exist, or the filter hides them. Deciding by `totalTasks` avoids telling a user with 5 open tasks that there are "no tasks yet".

### Reset filter to "all" after adding a task

- **Why:** on the Done tab, a newly added (unfinished) task was invisible, so the add looked broken. Data change goes up to `Dashboard`; the view change stays local.

## CI/CD & Testing

### Extract `filterTasks` into its own pure function

- **Why:** logic embedded in a component can only be tested by rendering the component and simulating clicks. A pure function (data in → data out) can be tested directly, in milliseconds, with no DOM.
- **Trade-off:** one extra file and import; worth it for testability.

### `npm test` vs `npm run test:watch`

- **Chose:** `vitest run` (exits) for `test`, plain `vitest` (watches) for `test:watch`
- **Why:** CI needs a command that finishes and reports pass/fail. A watch process would hang the pipeline forever.

### GitHub Actions runs lint → typecheck → build → test, in that order

- **Why:** fail fast on the cheapest check first. No point building or testing code that doesn't even lint or type-check.

## Day 6: Routing (react-router-dom)

### Nested routes with a Layout + Outlet, not flat routes

- **Options:** (a) flat routes, each page re-renders its own sidebar/header, (b) one layout route wrapping all pages via `<Outlet>`
- **Chose:** (b)
- **Why:** sidebar/header are identical across every page. Flat routes would duplicate that JSX per page and, worse, duplicate the `projects` state itself — breaking single source of truth.
- **Trade-off:** one extra indirection (`useOutletContext`) to read shared state in child pages, vs. plain props.

### Shared state lifted to `Layout`, passed via `useOutletContext`

- **Options:** (a) keep state in `Dashboard.tsx` and prop-drill into route components, (b) lift to `Layout`, pass through `<Outlet context={...}>`
- **Chose:** (b)
- **Why:** `Layout` is the first component that's a parent to *every* route. Prop-drilling doesn't work once "children" are picked by the router (`<Outlet>`), not by JSX nesting — `useOutletContext` is the equivalent of props for that boundary.
- **Revisit when:** if 3+ levels of nested routes need the same state, consider React Context instead (Outlet context only reaches direct route children).

### `findProjectById` extracted as a pure utility, not inline in the page

- **Why:** same reasoning as `filterTasks` (Day 5/CI) — pure input→output logic, testable without rendering. Added `findProjectById.test.ts` covering match, no-match, and `NaN` (invalid `:id` from the URL) — same code path handles both "wrong id" and "garbage id".

### Option B for `/` vs `/projects`: separate `DashboardHome` and `ProjectsPage`

- **Options:** (a) same grid component for both routes (index + `/projects`), (b) distinct components — slim overview vs full grid
- **Chose:** (b)
- **Why:** sidebar already has separate "Dashboard" and "Projects" nav items; making them render identical content would contradict the UI's own information architecture.

### `NavLink` with `end` prop on the root link only

- **Why:** `NavLink` prefix-matches by default — `to="/"` would show active on every route, since every path starts with `/`. `end={to === "/"}` restricts exact matching to the root link only; other links (`/projects`, `/tasks`) don't need it since nothing else prefixes them.

### Catch-all route (`path="*"`) placed last

- **Why:** `<Routes>` matches top-to-bottom, first match wins. `*` matches anything, so placing it first would swallow every real route before it's checked. Order carries real logic here, unlike CSS/Tailwind specificity resolving conflicts automatically.