'use client'

import { motion } from 'framer-motion'
import { Award, Database, Clock, DollarSign } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

export default function StatsSection() {
  const stats = [
    {
      icon: Award,
      value: 30,
      suffix: '+',
      label: 'Years Coaching',
      description: 'Coaching Olympic athletes'
    },
    {
      icon: Database,
      value: 400,
      suffix: '+',
      label: 'Tricks Database',
      description: 'Complete trick library'
    },
    {
      icon: Clock,
      value: 40,
      suffix: '%',
      label: 'Time Recovery',
      description: 'Efficiency gains'
    },
    {
      icon: DollarSign,
      value: 200,
      prefix: '$',
      suffix: '+',
      label: 'Session Value',
      description: 'Professional rates'
    },
  ]

  return (
    <section className="py-20 bg-background border-y border-line">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            Proven Track Record
          </h2>
          <p className="text-ink-muted max-w-2xl mx-auto">
            Numbers that showcase our commitment to elite skateboarding coaching
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-4 rounded-xl bg-brand-primary/10 border border-brand-primary/20 group-hover:bg-brand-primary/20 group-hover:border-brand-primary/40 transition-all duration-300"
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-primary" />
                </motion.div>

                {/* Animated Counter */}
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading text-brand-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>

                {/* Label */}
                <div className="text-white font-heading text-sm md:text-base mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-ink-muted text-xs md:text-sm font-body">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
