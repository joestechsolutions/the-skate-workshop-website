#!/usr/bin/env bash
# Post-deploy smoke test for theskateworkshop.app. Run by CI after every deploy
# (.github/workflows/deploy.yml, which rolls back on failure) and by
# `npm run deploy` locally. Writes nothing: GETs, plus POSTs of an empty body that
# the form APIs reject at validation (400) before touching the database.
#
#   bash scripts/smoke.sh                     # production
#   bash scripts/smoke.sh https://skate-workshop-web.joe-184.workers.dev
set -uo pipefail

BASE="${1:-${SMOKE_BASE_URL:-https://www.theskateworkshop.app}}"
BASE="${BASE%/}"
FAILS=0

# check <expected> <curl args...>: retries briefly while a fresh deploy propagates.
check() {
  local want="$1" label="$2"; shift 2
  local status try
  for try in 1 2 3; do
    status=$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$@" || true)
    [[ "$status" == "$want" ]] && break
    sleep 5
  done
  if [[ "$status" == "$want" ]]; then echo "ok   $label -> $status"
  else echo "FAIL $label -> $status (expected $want)" >&2; FAILS=$((FAILS + 1)); fi
}

echo "smoke: $BASE"
for page in / /about /coaches /contact /download /features /pricing /privacy /terms; do
  check 200 "$page" "$BASE$page"
done
check 404 "unknown path" "$BASE/smoke-check-$(date +%s)-does-not-exist"
# Next 16 rejects image qualities not listed in next.config.js (#18): the logo uses 100.
check 200 "logo via /_next/image (q=100)" "$BASE/_next/image?url=%2Fimages%2Flogo%2Ftsw-logo.png%3Fv%3D2&w=128&q=100"
for api in contact waitlist coach-application; do
  check 400 "POST /api/$api (empty body rejected)" -X POST -H 'content-type: application/json' -d '{}' "$BASE/api/$api"
done

if (( FAILS > 0 )); then echo "smoke: $FAILS check(s) failed on $BASE" >&2; exit 1; fi
echo "smoke: all checks passed on $BASE"
