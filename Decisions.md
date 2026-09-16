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

### What's next
- Day 3: useState + events — make checkboxes interactive, progress bar updates live