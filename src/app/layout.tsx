import type { Metadata } from 'next'
import { Spline_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const splineSans = Spline_Sans({
  subsets: ['latin'],
  variable: '--font-spline',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://theskateworkshop.app'),
  title: 'The Skate Workshop App | Mobile Skateboarding Coaching from a Coach of Olympians',
  description: 'Train with Willy Santos, working with Commission Skateboard France with 30+ years of experience. Mobile skateboarding coaching app featuring video analysis, live session tracking, and 400+ trick database.',
  keywords: 'skateboarding app, mobile skate training, skateboarding coaching, elite skate training, Olympic skateboard coach, Willy Santos, professional skateboarding, skate lessons',
  authors: [{ name: 'The Skate Workshop App' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'The Skate Workshop App | Mobile Skateboarding Coaching',
    description: 'Train with Willy Santos, coach of Olympic athletes. Mobile skateboarding coaching app with video analysis, progress tracking, and expert guidance.',
    url: 'https://theskateworkshop.app',
    siteName: 'The Skate Workshop App',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Skate Workshop App Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Skate Workshop App | Mobile Skateboarding Coaching',
    description: 'Train with Willy Santos, coach of Olympic athletes. Mobile app for skaters.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${splineSans.variable} ${splineSans.className} overflow-x-hidden antialiased bg-background text-white`}>
        <Navigation />
        <main id="main-content" className="relative">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
