'use client'

import {Session} from '@supabase/supabase-js'
import {DownloadIcon} from 'lucide-react'
import {Profile} from '~/types/profile'
import checkIfSelf from '~/utils/self'

export default function DownloadButton({
	session,
	profile
}: {
	session: Session
	profile: Profile
}) {
	const isOwn = checkIfSelf(session, profile)
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

	if (isOwn)
		return (
			<button className='group px-6 py-2 text-xl'>
				<DownloadIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5' />
				Download
			</button>
		)
}
