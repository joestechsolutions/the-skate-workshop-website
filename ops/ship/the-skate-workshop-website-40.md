# Release record — joestechsolutions/the-skate-workshop-website PR #40

<!-- RELEASE-GATE
pr: 40
repo: joestechsolutions/the-skate-workshop-website
head: 1e7936090cac0e9e3c33bb67b70c5e849e6221ec
code_review:    PASS review object 5944997659 (APPROVED, zero blocking findings) at 1e793609 plus a fresh-context independent reviewer at the same head: verdict clean, 0 blocking, 4 non-blocking (an Ollama Cloud glm-5.3 model, not Anthropic; the CLI log labels the route claude-opus-5-5, which is only the alias the proxy maps to glm-5.3). I re-verified its core claim myself: integrity hash and tarball URL of all 10 changed packages equal the registry's for 16.4.6 (10 of 10)
simulation:     N/A framework patch bump (next 16.4.3 to 16.4.6), no new feature or screen; stand-in measured instead: the same OpenNext build served in a local workerd preview at the old and the new version, 159 of 159 comparisons equal (pages, image bytes, form-route responses)
product_verify: PASS jts-vp-product lens 2026-11-17: the client asked for nothing visible; nothing visible changed (visible text of all 10 live pages identical before and after, 40 of 40 image URLs byte-identical, the three forms answer identically). Client-facing one-liner: "No visible change: behind-the-scenes security update to the framework the site runs on." Nothing is surfaced that should not be, and there is no surprise surface
release_verify: PASS jts-vp-engineering lens 2026-11-17: merge to main runs deploy.yml (lint, typecheck, vitest, OpenNext build, deploy, smoke on the workers.dev URL) with automatic wrangler rollback if the smoke fails; no release window on this repo. Manual rollback is a revert plus the same workflow, or npx wrangler rollback. Unmonitored: the success path of the three forms (the smoke posts empty bodies and expects 400, so it never writes a real row) and the compressed-response path (smoke sends no Accept-Encoding); both behaved identically at 16.4.3 and 16.4.6 in the local before/after run
ci:             PASS build job run 44026135651 at the PR head 1e793609 and Deploy run 44157435310 at the merge commit 573035f1 (lint, typecheck, unit tests, OpenNext build, deploy and smoke all success; the rollback step was skipped)
live_verify:    PASS 2026-11-17T19:22Z: scripts/smoke.sh 14 of 14 checks passed on https://www.theskateworkshop.app; the shipped client chunk now reports Next.js 16.4.6 (it reported 16.4.3 before the merge); all 10 probed pages return the same status and the same visible text as before; 40 of 40 /_next/image URLs byte-identical to the pre-merge snapshot
-->

## What shipped
Dependabot patch bump of `next` 16.4.3 to 16.4.6 (v16.4.4, v16.4.5, v16.4.6). Merge commit
573035f10f21057774cf36b3a56054118bb74540 at 2026-11-17T19:19:58Z, merged with `--merge --match-head-commit`
at the reviewed head. The merge commit's tree equals the PR head's tree (71a07a3a3c54), so production
runs exactly what CI tested.

Scope: `package.json` (1+/1-) and `package-lock.json` (52+/40-). Only `next`, `@next/env` and the eight
`@next/swc-*` entries changed. No dependency added or removed, no `overrides`, `engines` or `scripts`
change, every `resolved` URL on registry.npmjs.org, every changed version reads 16.4.6.

v16.4.5 carries seven security advisories. The site uses none of `use cache`, `unstable_cache`, Cache
Components, the Edge runtime or forwarded fetch responses. It does set `dangerouslyAllowSVG`, so the
image-optimizer advisory (an SVG rejection bypass) does not widen its exposure, and the bump also picks up
the fix.

## Verification
| gate | who ran it | verdict | evidence |
|---|---|---|---|
| Independent code review | fresh-context reviewer, adjudicated by the cron | CLEAN, 0 blocking | 5 scoped checks (scope, registry integrity, compatibility, release-note relevance, drift); 10 of 10 integrity hashes re-verified directly against the registry |
| Isolated rig at the PR head | cron, clean environment, no secrets | PASS | npm ci, lint (0 errors; 11 warnings in files the PR does not touch), typecheck, vitest 6 of 6, OpenNext build ("Next.js 16.4.6"), smoke against the local workerd preview |
| Before/after on the real runtime | cron | PASS, 159 of 159 equal | same OpenNext build at the old and new version, both served in local workerd: 13 paths (9 pages plus 4 not-found paths) same status, headers and body once hashed asset names are normalised; 139 image URLs byte-identical; 3 form routes x 2 Accept-Encoding settings plus one GET all equal |
| Persona simulation | n/a | N/A | framework patch bump with no new surface |
| Product verification | jts-vp-product lens | PASS | no visible change; see the one-liner above |
| Release verification | jts-vp-engineering lens | PASS | deploy path, automatic rollback, what is unmonitored: see the block above |
| CI at head | GitHub Actions | PASS | build run 44026135651 at the head; Deploy run 44157435310 at the merge commit |
| Live after deploy | cron, from the ops machine | PASS | smoke 14 of 14 on the production domain; chunk reports 16.4.6; 10 pages same text; 40 of 40 images identical |

## Iterations (1 round, no fix rounds)
- 2026-11-17 11:00 PST fire: review round 1 clean at 1e793609, APPROVED posted as a review object by the
  other account (the PR author is the Dependabot app), `ship-reviewed` applied, merged head-pinned (verified
  MERGED via `gh pr view`, not from the exit code), deploy run watched to success, live checks above.
- The reviewer's note that route-handler compression does not run in the Worker rested on source reading.
  The runtime comparison shows the three routes answer the same way, gzip or not, at both versions, so
  nothing in this PR depends on that claim.

## Non-blocking findings and where they went
Issues are disabled on this repo, so they live here:
1. `scripts/smoke.sh` sends no `Accept-Encoding`, so the rollback net only exercises the uncompressed
   response path. Follow-up: add one `gzip` POST to a form route in the smoke script (its own small PR).
2. The build prints "React 18 support is deprecated in Next.js 16 and will be removed in Next.js 17".
   Follow-up for the next major: plan the React 19 move. No action for this bump.
3. The four linux `@next/swc-*` lock entries gain a `libc` field. The registry already carried it at 16.4.3;
   the old lockfile simply did not record it. Cosmetic.
4. `eslint-config-next` stays at 16.3.8 while `next` is at 16.4.6. It has no `next` peer, so there is no
   conflict; routine lag for a patch bump.

## Receipt
merged by cron gate: PR #40 · review clean at 1e793609 · build run 44026135651 · merge 573035f1 · deploy run 44157435310 · live: smoke 14 of 14 on https://www.theskateworkshop.app, chunk reports Next.js 16.4.6
