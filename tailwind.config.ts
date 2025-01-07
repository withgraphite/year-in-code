import {Config} from 'tailwindcss'

const tailwindConfig = {
	content: ['**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Geist', 'ui-sans-serif', 'system-ui'],
			mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular']
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
