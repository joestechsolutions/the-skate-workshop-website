import Link from 'next/link'
import { Metadata } from 'next'

// Written from what the app and this website actually do. The language shared
// with the app (what we collect, children) is kept in step with the app's
// app/legal.tsx; the website's own collection (forms, analytics) is verified
// against its own src/app/api/* routes and src/app/layout.tsx.

export const metadata: Metadata = {
  title: 'Privacy Policy | The Skate Workshop',
  description: 'Privacy Policy for The Skate Workshop app and website.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-xl mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-400">
              Last Updated: October 25, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-gray-400 leading-relaxed">
                  The Skate Workshop app and this website are built and operated by Joe's Tech Solutions LLC ("we," "our," or "us"). This Privacy Policy explains what both collect, why, and how you can have it deleted. It's written from what the code actually does — if you find it describing something that isn't real, tell us and we'll fix it.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Information the App Collects</h2>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Account information</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Creating an account requires an email address, handled by our authentication provider (Supabase Auth) via a one-time sign-in code — no password. You choose a display name and a role — athlete or coach. Coaches are identified by a coach code; athletes optionally enter one to link to a specific coach.
                </p>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Training content and messages</h3>
                <p className="text-gray-400 leading-relaxed">
                  Videos, photos, and text or voice messages you send to your matched coach or athlete are stored to deliver that feature. Messages are visible only to you and the coach or athlete you're paired with — never to your crew, other athletes, or other coaches. Our own staff can access data, including messages, only where needed to investigate a report, keep someone safe, fix a technical problem, or comply with the law.
                </p>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Sharing a clip or milestone with your crew</h3>
                <p className="text-gray-400 leading-relaxed">
                  Your training clips and progress milestones are private by default. You can choose to share an individual clip or milestone with your "crew" — the other athletes who train with your coach. This sharing is opt-in per item; nothing is shared automatically. You can make a shared clip private again at any time, and your coach can take a shared clip down. Sharing a clip does not share your messages, and coaches other than your own still cannot see your content.
                </p>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Photos</h3>
                <p className="text-gray-400 leading-relaxed">
                  You can set a profile photo, and the in-app feedback tool can attach a screenshot from your photo library if you choose to include one when reporting a problem.
                </p>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Push notifications</h3>
                <p className="text-gray-400 leading-relaxed">
                  If you allow notifications, we store a device push token so we can send them. It identifies your device for this purpose only.
                </p>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Crash reports, diagnostics, and bug reports</h3>
                <p className="text-gray-400 leading-relaxed">
                  The app uses Sentry to capture crash reports and errors, and runs light performance diagnostics (page-load and navigation timing) on a sample of sessions, so we can find and fix problems — this does not include session recordings or screenshots of your screen. The in-app feedback tool sends your device name and model, OS version, app version, and the screen you were on, plus whatever you write and an optional screenshot, to a private GitHub issue — Slack gets only a link and a report ID, not your device details or what you wrote.
                </p>

                <h3 className="text-2xl font-bold text-white mb-3 mt-6">What we do not collect in the app</h3>
                <p className="text-gray-400 leading-relaxed">
                  We do not process payments or collect payment information anywhere in the app — there is no billing system built into it. We do not run advertising and do not sell or share your information with advertisers.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Information This Website Collects</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Separately from the app, this website collects information if you use one of its forms:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li><strong className="text-white">Coach application:</strong> name, email, phone number, years of experience, and whatever you write</li>
                  <li><strong className="text-white">Contact form:</strong> name, email, the type of inquiry, and your message</li>
                  <li><strong className="text-white">Waitlist:</strong> name and email</li>
                </ul>
                <p className="text-gray-400 leading-relaxed mt-4">
                  These are sent by email through our provider (Hostinger), and a submission may also be logged on our server. This website also runs Vercel Analytics, which counts page views without cookies and without building a profile of you.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Who We Share Information With</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We use these providers to run the app and this website, and they process data on our behalf, not for their own purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>Supabase — database, file storage, and authentication</li>
                  <li>Sentry — crash reports and performance diagnostics</li>
                  <li>Expo / EAS — app builds, over-the-air updates, and delivering push notifications through Apple and Google's own push services</li>
                  <li>GitHub and Slack — in-app bug reports become a private GitHub issue and a Slack notification, visible to us only</li>
                  <li>Vercel — hosting and analytics for this website</li>
                  <li>Hostinger — sends the email for this website's forms</li>
                </ul>
                <h3 className="text-2xl font-bold text-white mb-3 mt-6">Legal requirements</h3>
                <p className="text-gray-400 leading-relaxed">
                  We may disclose information if required by law or a valid request from a public authority.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Data Security</h2>
                <p className="text-gray-400 leading-relaxed">
                  App data is stored in Supabase with row-level security scoping each user's access to their own account, their coach–athlete pairing, and (for a shared clip or milestone) the crew they've chosen to share with. No method of transmission or storage is 100% secure, and we can't guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Your Privacy Rights</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Email <a href="mailto:privacy@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">privacy@theskateworkshop.app</a> to ask what we hold about you, request a copy, ask for a correction, or ask for deletion of your active account data. If you're in California, the UK, or the EU, these are rights you have in law; we'll do it either way.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-400 leading-relaxed">
                  Many athletes on this platform are minors, using the app through a coach they already train with in person. The app does not verify age at signup and has no parental-consent flow — we are not claiming otherwise. We do not knowingly maintain an account for a child under 13. If you're a parent or guardian and believe your child under 13 has an account, email <a href="mailto:privacy@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">privacy@theskateworkshop.app</a> and we will delete it. See also our <Link href="/terms" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">Terms of Service</Link> for how this affects who's agreeing to what.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Data Retention</h2>
                <p className="text-gray-400 leading-relaxed">
                  We keep your account data in our active systems while your account is active. If you ask us to delete your account, we remove your personal information and content from those systems within a reasonable time, except where we're required to keep something by law.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-400 leading-relaxed">
                  If what we collect changes, this page changes with it, and the "Last Updated" date changes too.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <p className="text-white mb-2">The Skate Workshop</p>
                  <p className="text-gray-400">Operated by: Joe's Tech Solutions LLC</p>
                  <p className="text-gray-400 mt-2">Privacy: <a href="mailto:privacy@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">privacy@theskateworkshop.app</a></p>
                  <p className="text-gray-400">Support: <a href="mailto:support@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">support@theskateworkshop.app</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
