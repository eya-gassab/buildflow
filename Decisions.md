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