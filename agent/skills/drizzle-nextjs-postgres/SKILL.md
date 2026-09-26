---
name: drizzle-nextjs-postgres
description: Drizzle ORM against PostgreSQL inside a Next.js App Router app.
  Covers client construction (globalThis singleton across HMR, serverless pool
  sizing, `prepare:false` behind PgBouncer/Supavisor, driver choice when you
  need interactive transactions, `server-only`), reads in Server Components
  under Next.js 16 Cache Components (`use cache` superseding `unstable_cache`
  and the `revalidate`/`dynamic` segment configs, Suspense boundaries, React
  `cache()` dedupe), Server Actions (authorization inside the action,
  `updateTag` vs `revalidateTag`, `after()`), Postgres schema types
  (timestamptz, identity vs serial, jsonb, numeric-as-string, bigint modes),
  drizzle-kit migrations (generate vs push, CONCURRENTLY outside the migrator,
  NOT VALID constraints, rename prompts), transactions and pooled connections,
  and Postgres query traps (keyset pagination, count cost, driver-dependent
  `db.execute()` shape, NOT IN nulls, prepared statements). Use when writing or
  reviewing Drizzle + Postgres code in Next.js.
---
# Drizzle + PostgreSQL in Next.js

Library-reference skill for Drizzle ORM on PostgreSQL inside the Next.js App Router — 36 rules across 7 categories. Each rule names the wrong default it corrects; there is no rule for things a capable model already gets right.

This skill is self-contained: it includes the migration-workflow and type-inference rules a Postgres + Next.js developer needs even where the underlying wrong default is not Postgres-specific, so you never have to load a second skill mid-task. A few of those knowingly overlap the sibling `drizzle-sqlite` skill (same wrong default, restated for this context); the rest are decisions that only exist, or only bite differently, because the dialect is PostgreSQL or the code runs in the App Router.

Pinned to **drizzle-orm 0.45.2**, **drizzle-kit 0.31.10**, **Next.js 16.2.11**, PostgreSQL 14+.

## When to Apply

- Writing or reviewing the `lib/db` module — driver choice, pooling, singletons, `server-only`
- Fetching data in a Server Component, Route Handler, or `generateMetadata` with `db.select()` / `db.query.*`
- Deciding what to cache: `use cache`, `cacheLife`, `cacheTag`, React `cache()`, or nothing
- Writing a Server Action that mutates rows and has to invalidate what the read path cached
- Defining or changing a `pgTable` — column types, indexes, enums, constraints
- Running `drizzle-kit generate` / `migrate` / `push`, or hand-editing a generated `.sql` file
- Wrapping work in `db.transaction()`, or debugging a race, deadlock, or exhausted pool
- Reviewing a list, count, or pagination query that is fine locally and slow in production

## Rule Categories

| # | Category | Prefix | Covers |
|---|----------|--------|--------|
| 1 | Client Construction & Driver Choice | `conn-` | Singletons across HMR, serverless pool sizing, poolers, driver capability, `server-only`, passing `schema` |
| 2 | Reads in Server Components | `rsc-` | Suspense boundaries, `use cache` / `cacheLife` / `cacheTag`, request dedupe, waterfalls, runtime choice |
| 3 | Server Actions & Mutations | `mut-` | Authorization and validation in the action, cache invalidation, deferred writes |
| 4 | Postgres Schema Definition | `schema-` | timestamptz, identity columns, text vs varchar, numeric, jsonb, bigint modes, table config, enums |
| 5 | Migrations & Schema Change Safety | `migrate-` | generate vs push, concurrent indexes, where migrations run, renames, lock-safe constraints |
| 6 | Transactions & Pooled Connections | `tx-` | Connection cost of a held transaction, row locking, serialization retries |
| 7 | Postgres Query Building | `query-` | Keyset pagination, count cost, driver-dependent execute shape, NULL semantics, prepared statements |

## Quick Reference

### 1. Client Construction & Driver Choice

- [`conn-singleton-across-hmr`](references/conn-singleton-across-hmr.md) — Cache the pool on `globalThis` so dev hot reloads don't exhaust connections
- [`conn-pool-sizing-for-serverless`](references/conn-pool-sizing-for-serverless.md) — Total connections is instances × max; `max: 1` doesn't help
- [`conn-disable-prepare-behind-transaction-pooler`](references/conn-disable-prepare-behind-transaction-pooler.md) — `postgres(url, { prepare: false })` behind PgBouncer/Supavisor transaction mode
- [`conn-driver-choice-follows-transactions`](references/conn-driver-choice-follows-transactions.md) — `neon-http` throws on `db.transaction`; `db.batch()` is still atomic. Pick by read-then-decide-then-write
- [`conn-server-only-db-module`](references/conn-server-only-db-module.md) — `import 'server-only'` in the client module, not in the schema file
- [`conn-pass-schema-for-relational-queries`](references/conn-pass-schema-for-relational-queries.md) — `db.query` is empty without `{ schema }`, and `with` needs `relations()`

### 2. Reads in Server Components

- [`rsc-suspense-around-uncached-reads`](references/rsc-suspense-around-uncached-reads.md) — A query at the top of a page costs the route its static shell
- [`rsc-use-cache-replaces-unstable-cache`](references/rsc-use-cache-replaces-unstable-cache.md) — `use cache` + `cacheLife` + `cacheTag` supersede `unstable_cache` and segment configs
- [`rsc-no-request-apis-inside-use-cache`](references/rsc-no-request-apis-inside-use-cache.md) — `cookies()` throws inside `use cache`; pass the tenant id as an argument
- [`rsc-use-cache-is-per-instance-memory`](references/rsc-use-cache-is-per-instance-memory.md) — `use cache` is in-memory per instance; it is not durable query caching
- [`rsc-dedupe-with-react-cache`](references/rsc-dedupe-with-react-cache.md) — React `cache()` dedupes a lookup across layout, page, and metadata
- [`rsc-node-runtime-not-edge`](references/rsc-node-runtime-not-edge.md) — `runtime = 'edge'` is unsupported with Cache Components

### 3. Server Actions & Mutations

- [`mut-authorize-inside-the-action`](references/mut-authorize-inside-the-action.md) — An action is a public POST endpoint; check auth and input in its body
- [`mut-updatetag-vs-revalidatetag`](references/mut-updatetag-vs-revalidatetag.md) — `updateTag` for read-your-own-writes, `revalidateTag(tag, 'max')` for SWR
- [`mut-after-for-post-response-writes`](references/mut-after-for-post-response-writes.md) — `after()` moves audit and analytics writes off the response path

### 4. Postgres Schema Definition

- [`schema-timestamptz-not-timestamp`](references/schema-timestamptz-not-timestamp.md) — Bare `timestamp()` is not a point in time
- [`schema-identity-not-serial`](references/schema-identity-not-serial.md) — `generatedAlwaysAsIdentity()` over `serial()`
- [`schema-text-not-varchar-length`](references/schema-text-not-varchar-length.md) — `text()` unless the length limit is a real rule
- [`schema-numeric-is-a-string`](references/schema-numeric-is-a-string.md) — `numeric` infers as `string`; store money as integer cents
- [`schema-jsonb-with-dollar-type`](references/schema-jsonb-with-dollar-type.md) — `jsonb` for indexability, `$type<>()` for the shape
- [`schema-bigint-mode-truncation`](references/schema-bigint-mode-truncation.md) — `mode: 'number'` silently rounds past 2^53
- [`schema-table-extras-are-an-array`](references/schema-table-extras-are-an-array.md) — The third `pgTable` argument returns an array; the object form is deprecated
- [`schema-enum-values-are-append-only`](references/schema-enum-values-are-append-only.md) — A new enum value cannot be used until its transaction commits

### 5. Migrations & Schema Change Safety

- [`migrate-generate-not-push`](references/migrate-generate-not-push.md) — `push` applies an unreviewed diff; `generate` produces a file you can read
- [`migrate-concurrent-index-outside-transaction`](references/migrate-concurrent-index-outside-transaction.md) — `migrate()` runs all files in one transaction, so `CONCURRENTLY` fails inside it
- [`migrate-run-in-deploy-step-not-at-runtime`](references/migrate-run-in-deploy-step-not-at-runtime.md) — Concurrent cold starts race on `migrate()`; run it once, before traffic
- [`migrate-map-renames-explicitly`](references/migrate-map-renames-explicitly.md) — Picking "create column" at the prompt drops the renamed column's data
- [`migrate-add-constraints-not-valid-then-validate`](references/migrate-add-constraints-not-valid-then-validate.md) — `NOT VALID` skips the blocking scan; validate in a second deploy

### 6. Transactions & Pooled Connections

- [`tx-no-external-io-inside`](references/tx-no-external-io-inside.md) — A transaction pins a connection; a network call inside it drains the pool
- [`tx-lock-rows-for-read-modify-write`](references/tx-lock-rows-for-read-modify-write.md) — `read committed` lets two transactions read the same stale row
- [`tx-retry-serialization-failures`](references/tx-retry-serialization-failures.md) — `serializable` aborts with SQLSTATE `40001` and expects a retry

### 7. Postgres Query Building

- [`query-keyset-not-offset`](references/query-keyset-not-offset.md) — `OFFSET` reads and discards every row it skips
- [`query-count-scans-the-table`](references/query-count-scans-the-table.md) — Postgres stores no row count; `count(*)` visits rows every time
- [`query-execute-shape-is-driver-dependent`](references/query-execute-shape-is-driver-dependent.md) — Raw `db.execute()` returns `.rows` on node-postgres, a bare array on postgres-js
- [`query-not-in-null-trap`](references/query-not-in-null-trap.md) — One NULL in the subquery makes `NOT IN` return nothing
- [`query-prepared-statements-need-names`](references/query-prepared-statements-need-names.md) — `.prepare()` needs a name, and a transaction pooler defeats it

## How to Use

Read a reference file when its decision comes up. Each rule names the wrong default it corrects, then shows the canonical way (with an incorrect/correct contrast only where the wrong way is a real trap).

- [Section definitions](references/_sections.md) — category structure
- [Rule template](assets/templates/_template.md) — for adding new rules
- [AGENTS.md](AGENTS.md) — auto-built table of contents across all rules

## Related Skills

- `drizzle-sqlite` — the same ORM against SQLite-family backends; covers the dialect-agnostic query-building rules this skill deliberately omits
- `nextjs` — App Router patterns beyond the data layer
- `relational-database-design` — choosing the schema this skill teaches you to declare

## Reference Files

| File | Description |
|------|-------------|
| [references/_sections.md](references/_sections.md) | Category definitions and ordering |
| [assets/templates/_template.md](assets/templates/_template.md) | Template for new rules |
| [metadata.json](metadata.json) | Version and source references |
