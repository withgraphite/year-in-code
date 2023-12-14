'use client'

import {DownloadIcon} from 'lucide-react'

export default function DownloadButton() {
	try {
		// cwwonst rendered = await render({
		// 	id: 'wrapped',
		// 	inputProps: {
		// 		video: profile.video_manifest as Manifest,
		// 		stats: profile.github_stats as unknown as Stats
		// 	},
		// 	title: `${params.username}`
		// })
		// console.log(rendered)
	} catch (e) {}

	return (
		<button className='group px-6 py-2 text-xl'>
			<DownloadIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5' />
			Download
		</button>
	)
}
