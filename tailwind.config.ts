import config from '@rubriclab/tailwind-config'
import {Config} from 'tailwindcss'

const tailwindConfig = {
	content: ['**/*.tsx'],
	presets: [config],
	theme: {
		colors: {
			...config.theme.colors
		},
		extend: {
			animation: {
				'spin-slow': 'rotate 6s linear infinite'
			}
		}
	}
} satisfies Config

export default tailwindConfig
