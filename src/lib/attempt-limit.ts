// How many pass code tries are let through (the download page). Two counters from Cloudflare's rate limiting, set
// in wrangler.jsonc: a small one per visitor, so one person cannot hammer the check, and one for everybody together,
// so many machines guessing in parallel cannot either. A short wait after a wrong code does not do that on its own:
// guesses sent side by side all wait at the same time.
//
// The counters are approximate (Cloudflare counts per location and catches up in the background: on the live site
// the per-visitor one began to refuse after about twenty quick tries, not exactly five). They make guessing slow;
// what keeps the page shut is the pass code itself, which must be 8 or more characters and not a word a person
// would guess. Even at the shared limit the whole world gets under 200,000 tries a day.

export type Counter = { limit(options: { key: string }): Promise<{ success: boolean }> }
export type Counters = { DOWNLOAD_TRIES_PER_VISITOR?: Counter; DOWNLOAD_TRIES_ALL?: Counter }

/**
 * True when this try must be refused before the code is even looked at. Every try counts, right or wrong.
 * A counter that is not there (a local run, a test) lets the try through; a counter that fails refuses it.
 */
export async function tooManyTries(counters: Counters, visitor: string): Promise<boolean> {
  try {
    // The visitor's own counter first: someone over their own limit is refused here and never uses up a try of the
    // shared counter, so one machine hammering the check cannot lock everybody else out.
    const one = counters.DOWNLOAD_TRIES_PER_VISITOR ? await counters.DOWNLOAD_TRIES_PER_VISITOR.limit({ key: visitor || 'unknown' }) : { success: true }
    if (!one.success) return true
    const all = counters.DOWNLOAD_TRIES_ALL ? await counters.DOWNLOAD_TRIES_ALL.limit({ key: 'all' }) : { success: true }
    return !all.success
  } catch {
    return true
  }
}
