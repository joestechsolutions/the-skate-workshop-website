import { Metadata } from 'next'
import WaitlistForm from '@/components/WaitlistForm'

// No install link here: the app is being tested by an invited crew and is not open yet (the owner, 2026-11-28:
// "Take that down. We are not ready yet"). People leave an email and hear when it opens.
export const metadata: Metadata = {
  title: 'Get the app | The Skate Workshop',
  description: 'The Skate Workshop app is not open yet. Leave your email and we will tell you when it is.',
}

export default function DownloadPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="section-container w-full">
        <div className="max-w-3xl mx-auto py-20">
          {/* Eyebrow */}
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8 text-center">
            NOT OPEN YET
          </p>

          {/* MASSIVE Headline */}
          <h1 className="text-display-xl font-heading text-white mb-12 text-center">
            GET THE <span className="text-brand-primary">APP</span>
          </h1>

          {/* Not open yet */}
          <p className="text-body text-white/70 mb-10 text-center max-w-xl mx-auto">
            The app is being tested with a small invited crew and is not open yet. Leave your email and we&apos;ll tell you when it is.
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
