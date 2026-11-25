import { Metadata } from 'next'
import WaitlistForm from '@/components/WaitlistForm'

// The outside testers' link (TestFlight, Apple's own app for early access). Apple limits it to 100 people.
const TESTFLIGHT_URL = 'https://testflight.apple.com/join/hqGJUNxK'

export const metadata: Metadata = {
  title: 'Get the app | The Skate Workshop',
  description: 'Early access on iPhone through TestFlight. Android is on its way to Google Play.',
}

export default function DownloadPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="section-container w-full">
        <div className="max-w-3xl mx-auto py-20">
          {/* Eyebrow */}
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8 text-center">
            EARLY ACCESS
          </p>

          {/* MASSIVE Headline */}
          <h1 className="text-display-xl font-heading text-white mb-12 text-center">
            GET THE <span className="text-brand-primary">APP</span>
          </h1>

          {/* iPhone */}
          <div className="text-center mb-20">
            <p className="text-body text-white/70 mb-8 max-w-xl mx-auto">
              On iPhone the app installs through TestFlight, Apple&apos;s free app for early access.
            </p>
            <a
              href={TESTFLIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-16 py-6 inline-block"
            >
              Get it on TestFlight
            </a>
            <p className="text-body-sm text-white/40 mt-8 max-w-xl mx-auto">
              After you sign up, tap Ask to join. A coach says yes before you see anything from the crew.
            </p>
          </div>

          {/* Android */}
          <p className="text-body text-white/70 mb-10 text-center max-w-xl mx-auto">
            Android is on its way to Google Play. Leave your email and we&apos;ll tell you when it&apos;s there.
          </p>
          <div id="waitlist">
            <WaitlistForm />
          </div>

          {/* Footer Note */}
          <p className="text-body-sm text-white/40 mt-12 text-center">
            No spam. Just one email when it&apos;s there.
          </p>
        </div>
      </div>
    </div>
  )
}
