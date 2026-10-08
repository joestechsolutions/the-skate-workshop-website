import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import TwemojiWrapper from '@/components/Twemoji'

export const metadata: Metadata = {
  title: 'About Willy Santos | Olympic Coach',
  description: 'Meet Willy Santos. 30+ years. Commission Skateboard France. Coached Olympians.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section - Minimal */}
      <section className="section-spacing-lg border-b border-white/10">
        <div className="section-container">
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8">Meet Willy</p>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-display-xl font-heading text-white mb-12">
                World Class <span className="text-brand-primary">Skate Mentor</span>
              </h1>
              <p className="text-body-lg text-white/80 mb-8 max-w-xl">
                Hey, I'm Willy Santos. I've been coaching for over 30 years, working with Commission Skateboard France, X-Games medalists, and Olympic competitors. I love helping skaters at every level find their flow and push their limits. Let's work together.
              </p>
            </div>

            <div className="relative h-[600px] bg-gray-900/30 rounded-2xl overflow-hidden">
              <Image
                src="/images/coach-willy.jpg"
                alt="Willy Santos"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO HE'S COACHED */}
      <section className="section-spacing-lg border-b border-white/10">
        <div className="section-container">
          <h2 className="text-h2 font-heading text-white mb-20 text-center">
            Some amazing people I've <span className="text-brand-primary">worked with</span>
          </h2>

          {/* Notable Athletes - Clean Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Lucie Schoonheere", flag: "🇫🇷🥇", img: "/images/athletes/lucie-schoonheere.jpg", ig: "lucie_schoonheere" },
              { name: "Vincent Milou", flag: "🇫🇷🏅", img: "/images/athletes/vincent-milou.jpg", ig: "vincentmilou" },
              { name: "Bryce Wettstein", flag: "🇺🇸🏅", img: "/images/athletes/bryce-wettstein.jpg", ig: "brycewettstein" },
              { name: "Sakura Yosozumi", flag: "🇯🇵🥇", img: "/images/athletes/sakura-yosozumi.jpg", ig: "sakura_yosozumi" },
              { name: "Joseph Garbaccio", flag: "🇫🇷🏆", img: "/images/athletes/joseph-garbaccio.jpg", ig: "joseph_garbaccio" },
              { name: "Mazel Paris", flag: "🇵🇭", img: "/images/athletes/mazel-paris.jpg", ig: "mazelparis" },
              { name: "Ichiro Tsuzuki", flag: "🇯🇵", img: "/images/athletes/ichiro-tsuzuki.jpg", ig: "t.ichiro04" },
              { name: "Nana Conda", flag: "🇫🇷🏅", img: "/images/athletes/nana-conda.jpg", ig: "nanacondaskate" },
              { name: "Noé Montagard", flag: "🇫🇷", img: "/images/athletes/noe-montagard.jpg", ig: "noe_montagard" },
              { name: "Tom Martin", flag: "🇫🇷", img: "/images/athletes/tom-martin.jpg", ig: "tom.martin.13" },
            ].map((athlete) => (
              <a
                key={athlete.name}
                href={`https://www.instagram.com/${athlete.ig}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative aspect-square mb-3 rounded-xl overflow-hidden">
                  <Image
                    src={athlete.img}
                    alt={athlete.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-center">
                  <TwemojiWrapper className="text-lg mb-1 block">
                    {athlete.flag}
                  </TwemojiWrapper>
                  <p className="text-sm text-white/80 font-heading group-hover:text-brand-primary transition-colors">
                    {athlete.name.toUpperCase()}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <p className="text-body-sm text-white/50 text-center mt-16 max-w-2xl mx-auto">
            I've been incredibly fortunate to work with Olympic athletes, X-Games medalists, and the Commission Skateboard France team. Each one has taught me something new about dedication and passion for skating.
          </p>
        </div>
      </section>

      {/* WHAT HE BELIEVES */}
      <section className="section-spacing-lg border-b border-white/10">
        <div className="section-container">
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8">How I like to help</p>

          <div className="max-w-4xl">
            <h2 className="text-display-lg font-heading text-white mb-12">
              Master the <span className="text-brand-primary">fundamentals</span><br/>
              Build <span className="text-brand-primary">real progress</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="border-l-2 border-brand-primary pl-6">
                <h3 className="text-h4 font-heading text-white mb-3">Build Strong Foundations</h3>
                <p className="text-body-sm text-white/60">
                  I believe in getting the basics solid first. Once you have good fundamentals, everything else becomes so much easier and more fun.
                </p>
              </div>

              <div className="border-l-2 border-brand-primary pl-6">
                <h3 className="text-h4 font-heading text-white mb-3">Take It Step by Step</h3>
                <p className="text-body-sm text-white/60">
                  There's no rush! We'll work through tricks together at your pace. I've got 400+ tricks we can explore, but we'll go one step at a time.
                </p>
              </div>

              <div className="border-l-2 border-brand-primary pl-6">
                <h3 className="text-h4 font-heading text-white mb-3">Personal Support</h3>
                <p className="text-body-sm text-white/60">
                  Everyone learns differently, so I'll give you feedback that's tailored to your style and goals. We're in this together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WILLY'S WORKSHOP */}
      <section className="section-spacing-lg border-b border-white/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/60 uppercase tracking-widest text-sm mb-8">When I'm not coaching</p>
            
            <h2 className="text-display-lg font-heading text-white mb-8">
              I love building <span className="text-brand-primary">custom skateboards</span>
            </h2>
            
            <p className="text-body-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Skateboarding has always been about creativity and personal expression. In my workshop, I craft custom boards for skaters who want something that's uniquely theirs. It's another way I get to be part of the skating community.
            </p>
            
            <Link 
              href="https://willysworkshop.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-12 py-4 inline-block"
            >
              Check out my workshop
            </Link>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="section-spacing-lg">
        <div className="section-container text-center">
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8">Want to skate together?</p>

          <h2 className="text-display font-heading text-white mb-12 max-w-5xl mx-auto">
            Ready to take your skating <span className="text-brand-primary">to the next level</span>?
          </h2>

          <Link href="/download" className="btn-primary text-lg px-16 py-6 inline-block">
            Join our community
          </Link>
        </div>
      </section>
    </div>
  )
}
