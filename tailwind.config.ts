
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
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
                // Custom Hogwarts house colors
                gryffindor: {
                    primary: '#740001',
                    secondary: '#D3A625',
                    light: '#AE0001'
                },
                slytherin: {
                    primary: '#1A472A',
                    secondary: '#5D5D5D',
                    light: '#2A623D'
                },
                ravenclaw: {
                    primary: '#0E1A40',
                    secondary: '#946B2D',
                    light: '#222F5B'
                },
                hufflepuff: {
                    primary: '#ECB939',
                    secondary: '#372E29',
                    light: '#F0C75E'
                },
                // New midnight theme colors
                midnight: {
                    DEFAULT: '#0E1A40', // Dark blue base
                    dark: '#080F24',    // Darker blue for footer/header
                    light: '#1C2B59',   // Lighter blue for hover states
                    foreground: '#E8EBF7', // Light text for good contrast
                },
                stars: '#D4AF37', // Gold color for accents like stars
                parchment: '#F5F0E1',
                ink: '#2A2922',
                hogwarts: {
                    stone: '#6E6A65',
                    wood: '#5C4033',
                    gold: '#D4AF37'
                },
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' }
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'page-transition-in': {
                    '0%': { opacity: '0', transform: 'scale(0.98)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'page-transition-out': {
                    '0%': { opacity: '1', transform: 'scale(1)' },
                    '100%': { opacity: '0', transform: 'scale(1.02)' }
                },
                'magic-particles': {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
                    '50%': { opacity: '1' },
                    '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' }
                },
                'twinkling': {
                    '0%': { opacity: '0.3' },
                    '50%': { opacity: '1' },
                    '100%': { opacity: '0.3' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'page-in': 'page-transition-in 0.4s ease-out',
                'page-out': 'page-transition-out 0.4s ease-in',
                'magic-particles': 'magic-particles 3s ease-out infinite',
                'twinkle': 'twinkling 4s ease-in-out infinite'
			},
            backgroundImage: {
                'night-sky': 'radial-gradient(circle at 100% 100%, #080F24 0%, #0E1A40 40%, #1C2B59 100%)',
                'stars': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23FFFFFF\' stroke-opacity=\'0.3\'%3E%3Ccircle r=\'1\' cx=\'100\' cy=\'100\'/%3E%3Ccircle r=\'1\' cx=\'200\' cy=\'200\'/%3E%3Ccircle r=\'1\' cx=\'300\' cy=\'300\'/%3E%3Ccircle r=\'1\' cx=\'400\' cy=\'400\'/%3E%3Ccircle r=\'0.5\' cx=\'500\' cy=\'500\'/%3E%3Ccircle r=\'0.5\' cx=\'600\' cy=\'600\'/%3E%3Ccircle r=\'0.5\' cx=\'700\' cy=\'700\'/%3E%3Ccircle r=\'0.5\' cx=\'50\' cy=\'50\'/%3E%3Ccircle r=\'0.5\' cx=\'150\' cy=\'150\'/%3E%3Ccircle r=\'0.5\' cx=\'250\' cy=\'250\'/%3E%3C/g%3E%3C/svg%3E")',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
