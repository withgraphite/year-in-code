import {Config} from 'tailwindcss'

const tailwindConfig = {
	content: ['**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        	mono: ['var(--font-geist-mono)',  'ui-monospace', 'SFMono-Regular'],
		},
		extend: {
			animation: {
				'spin-slow': 'rotate 6s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
			}
		}
	}
} satisfies Config

export default tailwindConfig
