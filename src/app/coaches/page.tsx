'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react'
import confetti from 'canvas-confetti'

// Validation schema
const coachApplicationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  yearsExperience: z.string().min(1, 'Please enter your years of experience'),
  message: z.string().min(10, 'Please tell us why you want to join (at least 10 characters)'),
})

type CoachApplicationFormData = z.infer<typeof coachApplicationSchema>

export default function CoachesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CoachApplicationFormData>({
    resolver: zodResolver(coachApplicationSchema),
    mode: 'onChange',
  })

  // Trigger confetti animation
  const fireConfetti = () => {
    const count = 100
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FC4C02', '#FF6B35', '#FFFFFF'],
    }

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }

  const onSubmit = async (data: CoachApplicationFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/coach-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit application')
      }

      // Success!
      setIsSuccess(true)
      fireConfetti()
      reset()
    } catch (error) {
      setErrorMessage((error instanceof Error && error.message) || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-spacing-lg border-b border-white/10">
        <div className="section-container">
          <p className="text-white/60 uppercase tracking-widest text-sm mb-8">For fellow coaches</p>

          <h1 className="text-display-xl font-heading text-white mb-12 max-w-6xl">
            Join our <span className="text-brand-primary">coaching network</span>
          </h1>

          <p className="text-body-lg text-white/70 max-w-2xl mb-8">
            I'm looking for passionate coaches who share my love for helping skaters grow. Together, we can create something special - a place where every skater feels supported and encouraged to reach their potential.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-spacing-lg border-b border-white/10">
        <div className="section-container">
          <h2 className="text-h2 font-heading text-white mb-20 text-center">
            What we can <span className="text-brand-primary">build together</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="border-l-2 border-brand-primary pl-6">
              <h3 className="text-h4 font-heading text-white mb-3">Fair Partnership</h3>
              <p className="text-body-sm text-white/60">
                You keep 70% of what you earn because your coaching is the heart of what we do. I'll handle the technology so you can focus on what you love.
              </p>
            </div>

            <div className="border-l-2 border-brand-primary pl-6">
              <h3 className="text-h4 font-heading text-white mb-3">Great Tools</h3>
              <p className="text-body-sm text-white/60">
                I've spent years developing tools that actually help - video analysis, progress tracking, and reporting features that make coaching easier and more effective.
              </p>
            </div>

            <div className="border-l-2 border-brand-primary pl-6">
              <h3 className="text-h4 font-heading text-white mb-3">Supportive Network</h3>
              <p className="text-body-sm text-white/60">
                Join a community of coaches who genuinely care about helping skaters. We'll support each other and share what works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-spacing-lg">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-h2 font-heading text-white mb-12 text-center">
              I'd love to <span className="text-brand-primary">hear from you</span>
            </h2>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                // Success State
                <motion.div
                  key="success"
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-2xl p-8 md:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-12 h-12 text-brand-primary" />
                  </motion.div>
                  <h3 className="text-3xl font-heading text-white mb-4">
                    Application Received! 🎉
                  </h3>
                  <p className="text-white/90 text-lg mb-6">
                    We'll review your application and get back to you within 3-5 business days.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSuccess(false)}
                    className="bg-white text-brand-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Submit Another Application
                  </motion.button>
                </motion.div>
              ) : (
                // Form State
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800"
                >
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          {...register('fullName')}
                          id="fullName"
                          type="text"
                          placeholder="Your full name"
                          className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-lg text-white placeholder-gray-500
                            transition-all duration-200 focus:outline-none focus:ring-2
                            ${errors.fullName
                              ? 'border-error focus:ring-error/50'
                              : 'border-white/10 focus:ring-brand-primary focus:border-brand-primary'
                            }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-error text-sm mt-2"
                          >
                            {errors.fullName.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          {...register('email')}
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-lg text-white placeholder-gray-500
                            transition-all duration-200 focus:outline-none focus:ring-2
                            ${errors.email
                              ? 'border-error focus:ring-error/50'
                              : 'border-white/10 focus:ring-brand-primary focus:border-brand-primary'
                            }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-error text-sm mt-2"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input
                          {...register('phone')}
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-lg text-white placeholder-gray-500
                            transition-all duration-200 focus:outline-none focus:ring-2
                            ${errors.phone
                              ? 'border-error focus:ring-error/50'
                              : 'border-white/10 focus:ring-brand-primary focus:border-brand-primary'
                            }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-error text-sm mt-2"
                          >
                            {errors.phone.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-300 mb-2">
                        Years of Coaching Experience *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <input
                          {...register('yearsExperience')}
                          id="yearsExperience"
                          type="number"
                          placeholder="e.g., 5"
                          className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-lg text-white placeholder-gray-500
                            transition-all duration-200 focus:outline-none focus:ring-2
                            ${errors.yearsExperience
                              ? 'border-error focus:ring-error/50'
                              : 'border-white/10 focus:ring-brand-primary focus:border-brand-primary'
                            }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.yearsExperience && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-error text-sm mt-2"
                          >
                            {errors.yearsExperience.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Why do you want to join? *
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 text-gray-500">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <textarea
                          {...register('message')}
                          id="message"
                          rows={5}
                          placeholder="Tell us about your coaching experience and why you'd like to join The Skate Workshop..."
                          className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-lg text-white placeholder-gray-500
                            transition-all duration-200 focus:outline-none focus:ring-2 resize-none
                            ${errors.message
                              ? 'border-error focus:ring-error/50'
                              : 'border-white/10 focus:ring-brand-primary focus:border-brand-primary'
                            }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-error text-sm mt-2"
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          role="alert"
                          className="bg-error/10 border border-error/30 rounded-lg p-4 text-error text-sm"
                        >
                          {errorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full font-semibold px-8 py-4 rounded-lg transition-all duration-200
                        flex items-center justify-center gap-2
                        ${isSubmitting || !isValid
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg hover:shadow-glow'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Application...
                        </>
                      ) : (
                        'Send My Application'
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
