'use client'
import {Session} from '@supabase/supabase-js'
import {track} from '@vercel/analytics'
import {COMPOSITION_NAME} from 'lambda/config'
import {DownloadIcon} from 'lucide-react'
import Link from 'next/link'
import {z} from 'zod'
import {Profile} from '~/types/profile'
import {CompositionProps} from '~/types/schema'
import checkIfSelf from '~/utils/self'
import useRendering from '../../lambda/rendering'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from './Dialog'
import {Progress} from './Progress'

export default function DownloadControls({
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

	// Only download your own video
	if (!isOwn) return

	if (state.status === 'invoking')
		return <p className='w-full animate-pulse font-thin text-white'>Loading...</p>

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
				<button
					className='group px-6 py-2 text-xl'
					onClick={() => track('Downloaded')}>
					<DownloadIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5' />
					Download
				</button>
			</Link>
		)
	}

	if (state.status === 'error')
		return <p className='w-full font-thin text-white'>{state.error.message}</p>
	if (state.status === 'rendering')
		return (
			<div className='flex w-full flex-col gap-2'>
				<div className='flex w-full items-center justify-between font-thin text-white'>
					<p className='animate-pulse'>Rendering...</p>
					<p>{`${Math.round(state.progress * 100)}%`}</p>
				</div>
				<Progress value={state.progress * 100} />
			</div>
		)

	if (state.status === 'init')
		return (
			<AlertDialog>
				<AlertDialogTrigger
					className='border-none p-0'
					onClick={() => track('Download intent')}>
					<span className='rounded-xl border-2 border-black bg-black px-6 py-2 text-white transition-colors duration-300 hover:bg-white hover:text-black'>
						Download video
					</span>
				</AlertDialogTrigger>

				<AlertDialogContent className='bg-white'>
					<AlertDialogHeader>
						<AlertDialogTitle>Download takes 2 to 3 minutes!</AlertDialogTitle>
						<AlertDialogDescription>
							Before you can download, you need to render the video. This takes time.
							You only need to render the video once. Please do not navigate away from
							the page while the video is rendering.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className='text-black hover:bg-black hover:text-white'>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className='border-none p-0'
							onClick={() => {
								track('Rendering initiated')
								renderMedia()
							}}>
							<span className='h-full w-full rounded-xl border-2 border-black bg-black px-6 py-2 text-white transition-colors duration-300 hover:bg-white hover:text-black'>
								Start rendering
							</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)
}
