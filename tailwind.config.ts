import {Config} from 'tailwindcss'

const tailwindConfig = {
	content: ['**/*.tsx'],
	theme: {
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
