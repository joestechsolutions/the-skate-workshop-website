import Link from 'next/link'
import { Metadata } from 'next'

// Written from what the app actually does. The language shared with the app
// (user content, messaging) is kept in step with the app's app/legal.tsx. The
// age and children sections describe the app's actual state — no age
// verification at signup, no parental-consent capture (verified against the
// app repo's src/types/database.ts and app/legal.tsx on 2026-10-26) — and
// must change WITH the app, never ahead of it.

export const metadata: Metadata = {
  title: 'Terms of Service | The Skate Workshop',
  description: 'Terms of Service for The Skate Workshop app and website.',
}

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-xl mb-6">Terms of Service</h1>
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
                <h2 className="text-3xl font-bold text-white mb-4">Agreement to Terms</h2>
                <p className="text-gray-400 leading-relaxed">
                  These Terms of Service ("Terms") are a legally binding agreement between you and Joe's Tech Solutions LLC ("Company," "we," "us," or "our"), which builds and operates The Skate Workshop mobile app and this website (together, the "Service").
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  By creating an account or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Beta status</h2>
                <p className="text-gray-400 leading-relaxed">
                  The app is currently in beta, distributed through TestFlight and direct Android installs, not the public app stores. Beta software can have bugs, can lose data, and can change without notice. Use it accordingly, and tell us when something breaks — that's what the beta is for.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Accounts and roles</h2>
                <p className="text-gray-400 leading-relaxed">
                  Using the app requires an account, created with an email address through our authentication provider. When you set up your account you choose a role:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li><strong className="text-white">Athlete</strong> — optionally paired with a coach.</li>
                  <li><strong className="text-white">Coach</strong> — identified by a coach code you distribute to your own athletes.</li>
                </ul>
                <p className="text-gray-400 leading-relaxed mt-4">
                  A coach code establishes that an athlete is one of that coach's own students — it is not a background check, a certification, or a claim by us that any coach is qualified, licensed, or safe to train with. You are responsible for who you choose to train with, on or off the app, the same as you would be for any coaching relationship arranged outside it.
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  You're responsible for what happens under your account. Tell us if you think someone else has access to it.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">If you're under 18</h2>
                <p className="text-gray-400 leading-relaxed">
                  Many athletes on this platform are minors. If you are under 18, a parent or guardian must agree to these Terms on your behalf, and is responsible for your use of the Service. The app does not currently verify age at signup; a parent or guardian who allows a minor to use the Service is agreeing to these Terms for them.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Your content</h2>
                <p className="text-gray-400 leading-relaxed">
                  You keep ownership of the videos, photos, messages, and voice notes you upload or send ("Your Content"). By uploading it, you give us a limited license to host and display it inside the app for the features you use — nothing broader than that.
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  A clip or milestone you mark as shared with your crew is also shown to the other athletes who train with your coach — that's the only broader visibility that exists, and it only happens if you choose it. You can make a shared clip private again at any time, and your coach can take a shared clip down. Nothing is ever made public outside the app unless you separately choose to share it elsewhere yourself.
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  Don't upload or send content that's illegal, that harasses or endangers anyone, that shows anyone who hasn't agreed to be filmed, that includes someone else's personal information without their consent, or that infringes someone else's rights — including sharing someone else's clip to your crew without their OK. To report content or make a copyright complaint, email <a href="mailto:support@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">support@theskateworkshop.app</a>; we remove content that infringes, and we can suspend an account that violates this.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Coach–athlete messaging</h2>
                <p className="text-gray-400 leading-relaxed">
                  Coaches and their athletes can message each other — text, video, and voice notes — and review training clips directly in the app. Messages are visible only to you and the coach or athlete in that conversation — never to your crew, other athletes, or other coaches. Keep it to coaching. If a message or a coach makes you uncomfortable, or you believe someone is misusing the messaging or crew-sharing features, email <a href="mailto:support@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">support@theskateworkshop.app</a> and we will look into it — which can include looking at the reported message, the same as any report needs to be investigated to act on it. See our <Link href="/privacy" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">Privacy Policy</Link> for how we handle that.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Pricing and coach compensation</h2>
                <p className="text-gray-400 leading-relaxed">
                  The Service is currently free during the beta period. We are not currently charging for any tier, subscription, or coaching session through the app. If that changes, we'll tell you the price and give you a clear chance to accept or decline before you're ever charged — not a retroactive bill for something you already assumed was free.
                </p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  If a coach is compensated for coaching arranged around the app, that arrangement is between the coach and whoever pays them — the Service does not process payments, collect a platform fee, or guarantee any specific split. We are not a party to that arrangement.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Prohibited activities</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>Use the Service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service or its infrastructure</li>
                  <li>Use automated systems to access the Service without our permission</li>
                  <li>Impersonate any person or entity, including a coach code that isn't yours to use</li>
                  <li>Collect other users' information without their consent</li>
                  <li>Transmit viruses or other harmful code</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-400 leading-relaxed">
                  The Service and its content, excluding Your Content, are owned by Joe's Tech Solutions LLC and protected by applicable intellectual property law — except for Willy Santos's own name, likeness, and brand assets, which are used under license and remain his. You may not copy, modify, distribute, or resell any part of the Service without our prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
                <p className="text-gray-400 leading-relaxed">
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," ESPECIALLY GIVEN ITS BETA STATUS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p className="text-gray-400 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, JOE'S TECH SOLUTIONS LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, INCLUDING ANY DISPUTE, INJURY, OR LOSS ARISING FROM A COACHING RELATIONSHIP FORMED THROUGH THE SERVICE. SKATEBOARDING CARRIES INHERENT PHYSICAL RISK; THE SERVICE IS A VIDEO REVIEW AND COMMUNICATION TOOL, NOT A SUBSTITUTE FOR IN-PERSON COACHING, SAFETY EQUIPMENT, OR YOUR OWN JUDGMENT.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Account Termination</h2>
                <p className="text-gray-400 leading-relaxed">
                  We can suspend or terminate an account that violates these Terms. You can stop using the Service, or ask us to delete your account, at any time by emailing <a href="mailto:support@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">support@theskateworkshop.app</a>.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Governing Law and Disputes</h2>
                <p className="text-gray-400 leading-relaxed">
                  These Terms are governed by the laws of the State of California. Any dispute arising from these Terms or the Service will be resolved through binding arbitration under the rules of the American Arbitration Association, except that either party may bring an individual claim in small-claims court, and either party may seek injunctive relief in court where arbitration would not be adequate.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Severability</h2>
                <p className="text-gray-400 leading-relaxed">
                  If any part of these Terms is found unenforceable, that part is limited or removed to the minimum extent necessary, and the rest stays in effect.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Changes to Terms</h2>
                <p className="text-gray-400 leading-relaxed">
                  We may update these Terms as the app changes. Material changes will be reflected here with an updated "Last Updated" date. Continuing to use the Service after a change means you accept it.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <p className="text-white mb-2">The Skate Workshop</p>
                  <p className="text-gray-400">Operated by: Joe's Tech Solutions LLC</p>
                  <p className="text-gray-400 mt-2">Legal: <a href="mailto:legal@theskateworkshop.app" className="text-white underline decoration-brand-primary underline-offset-2 hover:decoration-brand-red-light">legal@theskateworkshop.app</a></p>
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
