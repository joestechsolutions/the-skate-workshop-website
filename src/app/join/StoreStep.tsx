import type { JoinConfig } from './config'

const btn =
  'inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/30 px-6 text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

export default function StoreStep({ config }: { config: JoinConfig }) {
  const { appStoreUrl, playStoreUrl } = config
  const any = Boolean(appStoreUrl || playStoreUrl)
  return (
    <section aria-labelledby="step-get" className="mt-12">
      <h2 id="step-get" className="text-white/60 uppercase tracking-widest text-sm mb-4">
        Step 1 · Get the app
      </h2>
      {any ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {appStoreUrl && <a className={btn} href={appStoreUrl}>App Store</a>}
          {playStoreUrl && <a className={btn} href={playStoreUrl}>Google Play</a>}
        </div>
      ) : (
        <p className="text-body text-white/70">
          The app is in testing. Ask your coach for the test version.
        </p>
      )}
    </section>
  )
}
