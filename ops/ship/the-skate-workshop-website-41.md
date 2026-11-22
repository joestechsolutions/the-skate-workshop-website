# Release record — joestechsolutions/the-skate-workshop-website PR #41

<!-- RELEASE-GATE
pr: 41
repo: joestechsolutions/the-skate-workshop-website
head: 7362c9d58d44228edf0c91b57894f6de3f1dfbbc
code_review:    PASS review object 6015109413 (APPROVED by the second account, zero blocking findings) at 7362c9d5, plus a fresh-context round-3 review of the same head (2026-11-22 13:33 PST, its pinned body hash 50b6c2d3 still equals the live PR body). I re-verified the load-bearing claims myself: 8 of 8 changed lock entries match the npm registry's integrity hash and tarball URL, 0 of 1006 lock entries resolve outside registry.npmjs.org, and the merged tree differs from main only in package.json and package-lock.json
simulation:     N/A dependency-only change (a lockfile refresh and two overrides), no screen or behavior a user can see or touch; stand-in measured instead: a live before/after snapshot of 10 pages, 17 static assets and the logo image (all identical, see live_verify)
product_verify: PASS jts-vp-product lens 2026-11-22: the client asked for nothing visible, and nothing visible changed (visible text of all 10 probed live pages identical before and after, 17 of 17 static assets and the logo image byte-identical). Nothing new is surfaced and nothing is left for a visitor to be surprised by. Client-facing one-liner: "No visible change: behind-the-scenes security update to two build-tool libraries; it clears the 3 open security alerts."
release_verify: PASS jts-vp-engineering lens 2026-11-22: merge to main runs deploy.yml (lint, typecheck, vitest, OpenNext build, deploy, smoke on the workers.dev URL) with automatic wrangler rollback if the smoke fails; one production deploy at a time (concurrency group); no release window on this repo. Rollback if the artifact were bad: npx wrangler rollback, or git revert -m 1 on merge commit 99e4356e plus the same workflow. Unmonitored: the success path of the three forms (the smoke posts empty bodies and expects 400, so it never writes a real row); this change did not touch them and worker.js is byte-identical
ci:             PASS build job run 44892985305 at the PR head 7362c9d5 (it ran on the earlier base 3a9ed30e); merged-tree gate on main 4e98ff47 plus the head (tree 0c464048) before the merge, one run: npm ci, lint (0 errors), typecheck, vitest 6 of 6, OpenNext build, all rc 0; Deploy run 45083714230 at merge commit 99e4356e (lint, typecheck, unit tests, OpenNext build, deploy, smoke all success, rollback skipped)
live_verify:    PASS 2026-11-22T23:33Z: scripts/smoke.sh 14 of 14 on https://www.theskateworkshop.app and all checks on the Worker URL; the build id on / changed from _y4xXzzhgL1Ws09RN-0kz to VBs5Gwn0lBJpqCg7pgs5O (new build live); 10 of 10 probed pages return the same status and the same visible text as the pre-merge snapshot; 17 of 17 static assets and the logo image are byte-identical to it; Dependabot shows 0 open alerts, with #11, #119 and #120 marked fixed at 23:31:38Z; the dependency graph lists glob 14.0.2, minimatch 11.0.1 and 3.1.5, sucrase 3.35.1
-->

## What shipped
Security housekeeping for the site behind theskateworkshop.app. It clears the three open Dependabot
alerts (1 high, 2 medium), all on transitive copies of `glob` and `minimatch` that no parent release
fixes inside its declared range. Nothing a visitor can see changed.

Merge commit 99e4356e094bcbd6bbaa791305f1f95cc9d095eb at 2026-11-22T23:31:28Z, merged with
`--merge --match-head-commit` at the reviewed head. The merge commit's tree equals the tree tested
before the merge (0c4640488deb), so production runs exactly what was checked.

Scope: `package.json` (+4, an `overrides` block with two conditional keys) and `package-lock.json`
(+63/−449). `sucrase` moves 3.35.0 to 3.35.1 inside its declared range; `glob` goes to 14.0.2 and
`minimatch` to 11.0.1 through the overrides. No app code, workflow, script or config changed.

## Verification
| gate | who ran it | verdict | evidence |
|---|---|---|---|
| Independent code review | fresh-context round-3 reviewer, adjudicated by the review cron | CLEAN, 0 blocking | review object 6015109413 at 7362c9d5; the PR's earlier rounds found two body-accuracy items (B1, B2), fixed before round 3 |
| Registry and supply chain | review cron | PASS | 8 of 8 changed entries equal the registry's integrity and tarball URL; 0 of 1006 entries off registry.npmjs.org; no install script on any of the 8; expected maintainers; newest of the 8 published 2026-11-11 |
| Advisories | review cron | PASS | semver range check over the lock: 3 of 3 alerts match main's lock, 0 of 3 match the head; npm audit 12 vulnerabilities (4 high, 8 moderate) on main's lock, 0 on the installed head tree |
| Merged-tree gate | review cron, clean environment, Node 22.23.4, npm 10.9.9 | PASS | main 4e98ff47 plus head: `git merge-tree` clean, only the two package files differ from main; npm ci, lint 0 errors (11 warnings, the count the PR states), typecheck, vitest 4 files and 6 tests, OpenNext build, all rc 0 |
| Build output vs main | review cron | PASS | one build each at different paths; after normalising paths and per-build ids and keys, 1268 of 1271 files identical and worker.js identical. The other 3: init.js differs by its build timestamp; handler.mjs is the same characters reordered (branch order and one constants declaration); handler.mjs.meta.json is the bundler's size listing, and all 12 differing values are larger in the main build by a multiple of 3, the 3-character difference between the two build directory names |
| Persona simulation | n/a | N/A | dependency-only change with no user-visible surface |
| Product verification | jts-vp-product lens | PASS | no visible change; see the one-liner above |
| Release verification | jts-vp-engineering lens | PASS | deploy path, automatic rollback, what is unmonitored: see the block above |
| CI at head | GitHub Actions | PASS | build run 44892985305 at the head; Deploy run 45083714230 at the merge commit |
| Live after deploy | review cron, from outside CI | PASS | smoke 14 of 14 on the domain; new build live; 10 of 10 pages same text; 17 of 17 assets identical; 0 open alerts |

## Iterations (1 review-cron round, no fix rounds)
- 2026-11-22 15:20 PST fire: the PR was un-drafted at 13:33 PST with its round-3 verdict posted only as
  an issue comment, so no review object or label existed. I re-verified the checks above, posted the
  verdict as a review object by the second account (the PR author's own account cannot approve), added
  `ship-reviewed`, and merged head-pinned. The merge was verified as MERGED with `gh pr view`, not from
  the exit code.
- CI at the head ran on base 3a9ed30e and was not re-run when main moved with #42 (src and
  tailwind.config.ts only, no package files). The merged-tree gate above closes that gap, and the Deploy
  workflow re-ran the full gate on the merge commit.
- Reading the dependency graph, not the manifest: the SBOM now lists glob 14.0.2, minimatch 11.0.1 and
  3.1.5 (eslint's copies, outside the vulnerable range) and sucrase 3.35.1, with no stale snapshot copy.

## Non-blocking findings and where they went
Issues are disabled on this repo, so they live here:
1. Drop the glob and minimatch overrides once typescript-eslint 8.73 or later and an adapter release
   that declares glob 14.0.2 or later are in use. Owner: the next dependency pass on this repo.
2. `npm ls` exits 1 for the two overridden packages after anything writes into node_modules. Reproduced
   once here (documented in the PR body). `npm ci`, lint, typecheck, tests and the build are unaffected.
   No action.
3. One optional wording nit on the PR's preview sentence (round 3). The PR body is not part of the merge
   commit message (this repo uses the PR title), so nothing to fix in main.

## Receipt
merged by cron gate: PR #41 · review clean at 7362c9d5 · build run 44892985305 · merge 99e4356e · deploy run 45083714230 · live: smoke 14 of 14 on https://www.theskateworkshop.app, build id changed, 10 of 10 pages same text, 17 of 17 assets identical, Dependabot 0 open
