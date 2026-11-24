import type { Metadata } from 'next'
import CopyButton from './CopyButton'
import StoreStep from './StoreStep'
import { joinConfig } from './config'
import { deepLink, formatCrewCode, parseCrewCode, spokenCode } from './code'

export const metadata: Metadata = {
  title: 'Join the crew | The Skate Workshop',
  robots: { index: false, follow: false },
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function JoinPage({ searchParams }: Props) {
  const code = parseCrewCode((await searchParams).code)

  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="section-container w-full">
        <div className="max-w-xl mx-auto py-16 text-center">
          {code && (
            <p className="text-white/60 uppercase tracking-widest text-sm mb-4">YOU&apos;RE INVITED</p>
          )}
          <h1 className="text-display-xl font-heading text-white mb-8">JOIN THE CREW</h1>

          {code ? (
            <div>
              <p
                role="text"
                aria-label={spokenCode(code)}
                className="font-heading text-5xl sm:text-6xl tracking-wider text-brand-primary break-all"
              >
                {formatCrewCode(code)}
              </p>
              <CopyButton text={formatCrewCode(code)} />
            </div>
          ) : (
            <p className="text-body text-white/70">
              This link has no crew code. Ask your coach to send it again.
            </p>
          )}

          <StoreStep config={joinConfig} />

          {code && (
            <section aria-labelledby="step-open" className="mt-12">
              <h2 id="step-open" className="text-white/60 uppercase tracking-widest text-sm mb-4">
                Step 2 · Open the app
              </h2>
              <a
                href={deepLink(code)}
                className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-brand-primary px-8 text-lg font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Open in the app
              </a>
              <p className="text-body-sm text-white/50 mt-4">
                Nothing happened? Open the app yourself and type the code.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
