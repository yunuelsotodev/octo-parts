---
name: use-pnpm
description: Enforce pnpm as the only package manager in this project. Triggers on any task involving installing, running, updating, or scaffolding dependencies — npm, npx, yarn, bun, or bunx must be translated to their pnpm equivalents. Never suggest or run npm in this repo.
---

# Use pnpm (never npm)

This project is pinned to pnpm (`packageManager: pnpm@10.26.0` in `package.json`).
Using npm/yarn/bun breaks the lockfile (`pnpm-lock.yaml`), duplicates the
virtual store, and causes the `ERR_PNPM_VIRTUAL_STORE_DIR_MAX_LENGTH_DIFF`
failures already seen in this repo. Always translate:

| Instead of (forbidden) | Use |
|---|---|
| `npm install <pkg>` | `pnpm add <pkg>` |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| `npm run <script>` / `npx <bin>` | `pnpm <script>` / `pnpm exec <bin>` |
| `npx <pkg>` (one-off) | `pnpm dlx <pkg>` |
| `npx skills <cmd>` | `pnpm dlx skills <cmd>` |
| `npm update` | `pnpm update` |
| `npm uninstall <pkg>` | `pnpm remove <pkg>` |

## Rules

1. **Never run or suggest `npm`, `npx`, `yarn`, or `bunx`** — not even for one-off
   scaffolds (`create-*`, `shadcn`, `prisma`, `skills`). Rewrite to `pnpm dlx`.
2. **Never hand-edit `pnpm-lock.yaml`.** Dependency changes go through
   `pnpm add/remove/update` + `pnpm install`.
3. **Run `pnpm install` in Windows (MINGW64/Git Bash), not WSL.** The WSL
   mount hits virtual-store and TTY errors (`ERR_PNPM_VIRTUAL_STORE_DIR_MAX_LENGTH_DIFF`,
   `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`); the Windows shell works.
4. **CI/non-TTY reinstalls:** if pnpm refuses to recreate `node_modules`
   without a TTY, retry with `CI=true pnpm install`.
5. **Verify after dependency changes:** `pnpm exec prisma validate`
   (or the relevant check) to confirm the store is healthy.
6. Docs and examples (shadcn, Better Auth, Prisma) show `npx` — translate
   every command before running or pasting it to the user.
