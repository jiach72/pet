# Change: Simplify UI Architecture

## Why
The current codebase has significant duplication across screen components, with every file re-defining constants (colors, layouts) and repeating complex UI structures. This increases maintenance cost and risk of visual inconsistency.

## What Changes
- **Centralize Constants**: Extract common colors and spacing into `@/constants/Theme.ts`.
- **Atomic UI Components**: Create `Section`, `Card`, and `Badge` components in `components/ui/` to replace boilerplate `View`/`Text` nests.
- **Refactor Screens**: Update `app/health/` and `app/(tabs)/` screens to consume the new theme and components.

## Impact
- Affected specs: `global-theme`, `layout-system`
- Affected code: `app/health/*.tsx`, `app/(tabs)/social.tsx`, `components/ui/`
