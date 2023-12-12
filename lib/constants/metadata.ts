import {Metadata} from 'next'

export const DOMAIN = {
	PROD: 'https://graphite-wrapped.vercel.app/',
	GRAPHITE: 'https://graphite.dev/'
}

export const META = {
	title: 'Year in Code | Graphite',
	desc: 'End 2023 with a video for your GitHub stats.',
	siteURL: 'http://localhost:3000',
	twitter: '@withgraphite'
}

export const DEFAULT_META: Metadata = {
	description: META.desc,
	openGraph: {
		description: META.desc,
		title: META.title
	},
	title: META.title,
	twitter: {
		card: 'summary_large_image',
		creator: META.twitter,
		description: META.desc,
		title: META.title
	}
}
