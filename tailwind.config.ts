import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	screens: {
  		sm: '800px',
  		md: '1200px',
  		lg: '1280px',
  		xl: '2048px'
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: '#121212', // Softer Dark Background (Strava/Modern)
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			brand: {
  				primary: '#FC4C02', // Strava Orange
  				secondary: '#00D9FF', // Brand Cyan
  				black: '#000000',
  				white: '#FFFFFF',
  				'red-dark': '#E04800',
  				'red-light': '#FF6B35'
  			},
  			surface: '#1F2937',
  			success: '#10b981',
  			warning: '#f59e0b',
  			error: '#ef4444',
  			info: '#3b82f6',
  			neutral: {
  				'400': '#9CA3AF',
  				'500': '#6B7280',
  				'800': '#1F2937'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-spline)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Noto Color Emoji',
  				'sans-serif'
  			],
  			heading: [
  				'var(--font-spline)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Noto Color Emoji',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-spline)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Noto Color Emoji',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SF Mono',
  				'Monaco',
  				'monospace'
  			]
  		},
  		fontSize: {
  			'display-xl': [
  				'clamp(4rem, 8vw, 8rem)',
  				{
  					lineHeight: '1',
  					letterSpacing: '-0.03em',
  					fontWeight: '700'
  				}
  			],
  			'display-lg': [
  				'clamp(3.5rem, 7vw, 7rem)',
  				{
  					lineHeight: '1.05',
  					letterSpacing: '-0.03em',
  					fontWeight: '700'
  				}
  			],
  			display: [
  				'clamp(3rem, 6vw, 6rem)',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.025em',
  					fontWeight: '700'
  				}
  			],
  			h1: [
  				'clamp(2.5rem, 5vw, 4.5rem)',
  				{
  					lineHeight: '1.15',
  					letterSpacing: '-0.02em',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'clamp(2rem, 4vw, 3.5rem)',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '-0.02em',
  					fontWeight: '600'
  				}
  			],
  			h3: [
  				'clamp(1.75rem, 3vw, 2.5rem)',
  				{
  					lineHeight: '1.25',
  					letterSpacing: '-0.015em',
  					fontWeight: '600'
  				}
  			],
  			h4: [
  				'clamp(1.5rem, 2.5vw, 2rem)',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.01em',
  					fontWeight: '600'
  				}
  			],
  			'body-xl': [
  				'1.375rem',
  				{
  					lineHeight: '1.6',
  					letterSpacing: '-0.01em'
  				}
  			],
  			'body-lg': [
  				'1.25rem',
  				{
  					lineHeight: '1.6',
  					letterSpacing: '-0.005em'
  				}
  			],
  			body: [
  				'1.125rem',
  				{
  					lineHeight: '1.7',
  					letterSpacing: '0'
  				}
  			],
  			'body-sm': [
  				'1rem',
  				{
  					lineHeight: '1.7',
  					letterSpacing: '0'
  				}
  			]
  		},
  		spacing: {
  			'14': '3.5rem',
  			'18': '4.5rem',
  			'20': '5rem',
  			'24': '6rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		maxWidth: {
  			content: '2048px',
  			section: '1280px'
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				md: '3rem',
  				lg: '4rem'
  			},
  			screens: {
  				sm: '800px',
  				md: '1200px',
  				lg: '1280px',
  				xl: '2048px'
  			}
  		},
  		boxShadow: {
  			glow: '0 0 20px rgba(252, 76, 2, 0.3)',
  			'glow-lg': '0 0 40px rgba(252, 76, 2, 0.4)',
  			glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'slide-in': 'slideIn 0.3s ease-out',
  			'scale-in': 'scaleIn 0.3s ease-out',
  			shimmer: 'shimmer 2s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideIn: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		transitionDuration: {
  			'400': '400ms'
  		}
  	}
  },
  plugins: [animate],
}
export default config