import {Metadata} from 'next'

export const META = {
	desc: 'A partnership between Graphite x Rubric.',
	siteURL: 'http://localhost:3000',
	title: 'Graphite Wrapped',
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
