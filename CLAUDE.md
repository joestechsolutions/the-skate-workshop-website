# Agent Instructions

> This file is mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions load in any AI environment.

## Deploying this site (read before shipping)

- **Production:** the Cloudflare Worker `skate-workshop-web` (OpenNext adapter), serving theskateworkshop.app and www through zone routes in `wrangler.jsonc`. Its own URL is https://skate-workshop-web.joe-184.workers.dev.
- **Ship = merge to `main`.** `.github/workflows/deploy.yml` runs lint, typecheck, tests, the OpenNext build, the deploy and `scripts/smoke.sh`, and **rolls back automatically** (`wrangler rollback`) if the smoke test fails. No machine needs Cloudflare credentials. Don't deploy by hand.
- **PRs:** `.github/workflows/ci.yml` runs the same gate, including the OpenNext build, so anything that can't ship fails on the PR.
- **Commands:** `npm run preview` runs the production build in the real Workers runtime locally. `npm run smoke [url]` smoke-tests production. `npx wrangler rollback` rolls back. **Emergency only** (Actions down): `npx wrangler login`, then `npm run deploy`.
- **Rules:** never add `export const runtime = "edge"`, which OpenNext can't build. Runtime secrets (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) live on the Worker (`npx wrangler secret put`). Keep `workers_dev: true` in `wrangler.jsonc`, or every deploy turns the workers.dev URL off. When upgrading Next.js, upgrade `@opennextjs/cloudflare` with it. The old Pages project, `next-on-pages`, Vercel and the `joblas` upstream repo are retired: deploy only from `joestechsolutions/the-skate-workshop-website` main.

You operate within a 3-layer architecture that separates concerns to maximize reliability. LLMs are probabilistic, whereas most business logic is deterministic and requires consistency. This system fixes that mismatch.

## The 3-Layer Architecture

- *Layer 1: Directive (What to do)**
- Basically just SOPs written in Markdown, live in `directives/`
- Define the goals, inputs, tools/scripts to use, outputs, and edge cases
- Natural language instructions, like you'd give a mid-level employee
- *Layer 2: Orchestration (Decision making)**
- This is you. Your job: intelligent routing.
- Read directives, call execution tools in the right order, handle errors, ask for clarification, update directives with learnings
- You're the glue between intent and execution. E.g you don't try scraping websites yourself—you read `directives/scrape_website.md` and come up with inputs/outputs and then run `execution/scrape_single_site.py`
- *Layer 3: Execution (Doing the work)**
- Deterministic Python scripts in `execution/`
- Environment variables, api tokens, etc are stored in `.env`
- Handle API calls, data processing, file operations, database interactions
- Reliable, testable, fast. Use scripts instead of manual work. Commented well.
- *Why this works:** if you do everything yourself, errors compound. 90% accuracy per step = 59% success over 5 steps. The solution is push complexity into deterministic code. That way you just focus on decision-making.

## Operating Principles

- *1. Check for tools first**

Before writing a script, check `execution/` per your directive. Only create new scripts if none exist.

- *2. Self-anneal when things break**
- Read error message and stack trace
- Fix the script and test it again (unless it uses paid tokens/credits/etc—in which case you check w user first)
- Update the directive with what you learned (API limits, timing, edge cases)
- Example: you hit an API rate limit → you then look into API → find a batch endpoint that would fix → rewrite script to accommodate → test → update directive.
- *3. Update directives as you learn**

Directives are living documents. When you discover API constraints, better approaches, common errors, or timing expectations—update the directive. But don't create or overwrite directives without asking unless explicitly told to. Directives are your instruction set and must be preserved (and improved upon over time, not extemporaneously used and then discarded).

## Self-annealing loop

Errors are learning opportunities. When something breaks:

1. Fix it

2. Update the tool

3. Test tool, make sure it works

4. Update directive to include new flow

5. System is now stronger

## File Organization

- *Deliverables vs Intermediates:**
- **Deliverables**: Google Sheets, Google Slides, or other cloud-based outputs that the user can access
- **Intermediates**: Temporary files needed during processing
- *Directory structure:**
- `.tmp/` - All intermediate files (dossiers, scraped data, temp exports). Never commit, always regenerated.
- `execution/` - Python scripts (the deterministic tools)
- `directives/` - SOPs in Markdown (the instruction set)
- `.env` - Environment variables and API keys
- `credentials.json`, `token.json` - Google OAuth credentials (required files, in `.gitignore`)
- *Key principle:** Local files are only for processing. Deliverables live in cloud services (Google Sheets, Slides, etc.) where the user can access them. Everything in `.tmp/` can be deleted and regenerated.

## Summary

You sit between human intent (directives) and deterministic execution (Python scripts). Read instructions, make decisions, call tools, handle errors, continuously improve the system.

Be pragmatic. Be reliable. Self-anneal.
