import {Metadata} from 'next'

export const META = {
	title: 'Year in code by Graphite',
	desc: 'Reflect on 2024 with a personalized highlight reel of your year in code.',
	twitter: '@withgraphite',
	domain: {
		prod: 'https://year-in-code.com/',
		web: 'https://graphite.dev/?utm_source=year_in_code'
	},

	github: 'https://github.com/withgraphite/year-in-code'
}

export const DEFAULT_META: Metadata = {
	metadataBase: new URL(META.domain.prod),
	title: META.title,
	description: META.desc,
	openGraph: {
		title: META.title,
		description: META.desc,
		url: META.domain.prod,
		siteName: META.title,
		locale: 'en_US',
		type: 'website'
	},
	twitter: {
		title: META.title,
		description: META.desc,
		card: 'summary_large_image',
		creator: META.twitter
	}
}
