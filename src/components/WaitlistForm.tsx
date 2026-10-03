'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, Mail, Lock } from 'lucide-react'
import confetti from 'canvas-confetti'

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

interface WaitlistFormProps {
  variant?: 'inline' | 'modal' | 'embedded'
}

export default function WaitlistForm({ variant = 'embedded' }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
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

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to join waitlist')
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
    <div className="w-full max-w-2xl mx-auto">
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
              You're In! 🎉
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Welcome to The Skate Workshop waitlist! We'll notify you the moment we launch.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSuccess(false)}
              className="bg-white text-brand-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Add Another Email
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
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-heading text-white mb-3">
                Join the Launch Waitlist
              </h3>
              <p className="text-gray-400">
                Get exclusive early access and be among the first to experience elite skateboarding coaching.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
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
                  {isValid && !errors.email && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-success"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      role="alert"
                      className="text-error text-sm mt-2"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Name Input (Optional) */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name (Optional)
                </label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-4 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                />
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
                    Joining...
                  </>
                ) : (
                  'Notify Me When We Launch'
                )}
              </motion.button>

              {/* Why-disabled hint: user testing read the grey button as broken */}
              {!isValid && !isSubmitting && (
                <p className="text-gray-500 text-sm text-center" aria-live="polite">
                  Enter your email above to join the list
                </p>
              )}

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 text-gray-500 text-sm pt-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>We respect your privacy</span>
                </div>
                <span>•</span>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
