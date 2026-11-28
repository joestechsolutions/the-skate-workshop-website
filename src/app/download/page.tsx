import { Metadata } from 'next'
import DownloadGate from '@/components/DownloadGate'
import WaitlistForm from '@/components/WaitlistForm'

// The app is being tested by an invited crew and is not open yet (the owner, 2026-11-28: "Take that down. We are
// not ready yet", then: "This should be behind a pass code screen"). The install links are not in this page: the
// server sends them only after the right pass code (src/lib/download-access.ts). Everyone else can leave an email.
export const metadata: Metadata = {
  title: 'Get the app | The Skate Workshop',
  description: 'The Skate Workshop app is being tested by an invited crew. Leave your email and we will tell you when it opens.',
  robots: { index: false, follow: false },
}

export default function DownloadPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="section-container w-full">
        <div className="max-w-3xl mx-auto py-20">
          {/* Eyebrow */}
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8 text-center">
            INVITED TESTERS
          </p>

          {/* MASSIVE Headline */}
          <h1 className="text-display-xl font-heading text-white mb-12 text-center">
            GET THE <span className="text-brand-primary">APP</span>
          </h1>

          {/* The pass code screen: the install links come from the server, after the right code */}
          <div className="mb-20">
            <DownloadGate />
          </div>

          {/* Everyone else */}
          <p className="text-body text-white/70 mb-10 text-center max-w-xl mx-auto">
            No pass code? The app is being tested with a small invited crew and is not open yet. Leave your email and we&apos;ll tell you when it is.
          </p>
          <div id="waitlist">
            <WaitlistForm />
          </div>

          {/* Footer Note */}
          <p className="text-body-sm text-white/40 mt-12 text-center">
            No spam. Just one email when it opens.
          </p>
        </div>
      </div>
    </div>
  )
}
