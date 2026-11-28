// How many pass code tries are let through (the download page). Two counters from Cloudflare's rate limiting, set
// in wrangler.jsonc: a small one per visitor, so one person cannot hammer the check, and one for everybody together,
// so many machines guessing in parallel cannot either. A short wait after a wrong code does not do that on its own:
// guesses sent side by side all wait at the same time.
//
// The counters are approximate (Cloudflare counts per location). With them the whole world gets a few tens of
// thousands of tries a day at most, which no pass code of 8 or more unpredictable characters is found with.

export type Counter = { limit(options: { key: string }): Promise<{ success: boolean }> }
export type Counters = { DOWNLOAD_TRIES_PER_VISITOR?: Counter; DOWNLOAD_TRIES_ALL?: Counter }

/**
 * True when this try must be refused before the code is even looked at. Every try counts, right or wrong.
 * A counter that is not there (a local run, a test) lets the try through; a counter that fails refuses it.
 */
export async function tooManyTries(counters: Counters, visitor: string): Promise<boolean> {
  try {
    const all = counters.DOWNLOAD_TRIES_ALL ? await counters.DOWNLOAD_TRIES_ALL.limit({ key: 'all' }) : { success: true }
    if (!all.success) return true
    const one = counters.DOWNLOAD_TRIES_PER_VISITOR ? await counters.DOWNLOAD_TRIES_PER_VISITOR.limit({ key: visitor || 'unknown' }) : { success: true }
    return !one.success
  } catch {
    return true
  }
}
