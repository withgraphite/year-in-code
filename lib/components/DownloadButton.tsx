'use client'
import {Session} from '@supabase/supabase-js'
import {COMPOSITION_NAME} from 'lambda/config'
import {DownloadIcon} from 'lucide-react'
import Link from 'next/link'
import {z} from 'zod'
import {Profile} from '~/types/profile'
import {CompositionProps} from '~/types/schema'
import checkIfSelf from '~/utils/self'
import useRendering from './../../lambda/rendering'

export default function DownloadButton({
	session,
	profile,
	inputProps
}: {
	session: Session
	profile: Profile
	inputProps: z.infer<typeof CompositionProps>
}) {
	const isOwn = checkIfSelf(session, profile)
	const {renderMedia, state, undo} = useRendering(COMPOSITION_NAME, inputProps)

	if (!isOwn) return

	if (state.status === 'invoking')
		return <p className='text-white'>Loading...</p>

	// If already rendered or just finished rendering
	if (state.status === 'done' || (profile.is_rendered && profile.download_url)) {
		const url = profile.download_url
			? profile.download_url
			: state.status === 'done'
				? state.url
				: ''
		return (
			<Link
				href={url}
				className='no-underline'>
				<button className='group px-6 py-2 text-xl'>
					<DownloadIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5' />
					Download
				</button>
			</Link>
		)
	}

	if (state.status === 'error')
		return <p className='text-white'>{state.error.message}</p>
	if (state.status === 'rendering')
		return <p className='text-white'>Rendering...</p>
	if (state.status === 'init')
		return <button onClick={renderMedia}>Render video</button>
}
