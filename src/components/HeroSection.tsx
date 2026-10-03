'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax: background moves slower than content
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  
  // Optional: fade out background as we scroll past
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      }
    }
  }

  // Word animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut'
      }
    }
  }

  // Badge animation
  const badgeVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut'
      }
    }
  }

  // Subtitle animation
  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.6,
        duration: shouldReduceMotion ? 0 : 0.5
      }
    }
  }

  // Button container animation
  const buttonContainerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.8,
        duration: shouldReduceMotion ? 0 : 0.5
      }
    }
  }

  return (
    <section ref={containerRef} className="relative bg-background py-24 md:py-32 lg:py-40 overflow-hidden min-h-screen flex items-center border-b border-white/10">
      {/* Hero Background Image with Parallax */}
      <motion.div 
        style={{ y: shouldReduceMotion ? 0 : y, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://theresandiego.com/wp-content/uploads/Willy-Santos-5.jpg"
          alt="Willy Santos skateboarding"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Lighter overlay for better visibility of the photo (30% instead of 60%) */}
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>
      
      <div className="section-container relative z-10" id="main-content">
        <div className="max-w-7xl mx-auto">
          {/* Small eyebrow */}
          <motion.p
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="text-white/60 uppercase tracking-widest text-sm mb-8 font-heading antialiased"
          >
            MOBILE TRAINING APP
          </motion.p>

          {/* MASSIVE headline with color accent */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-display-lg font-heading text-white mb-12 max-w-6xl antialiased"
          >
            Take your skating to the <span className="text-brand-primary">next level</span>
          </motion.h1>

          {/* Minimal subtitle */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="text-body-lg text-white/80 mb-14 max-w-2xl font-body antialiased"
          >
            Hi, I'm Willy Santos. I've been lucky to coach some amazing skaters over the years, and I'd love to help you improve your skating too.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/download"
                className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 w-full sm:w-auto text-center block"
              >
                Join the Community
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/about"
                className="btn-ghost text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 w-full sm:w-auto text-center block"
              >
                Get to Know Willy
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hidden md:block"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  )
}
