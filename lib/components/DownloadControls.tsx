'use client'
import {track} from '@vercel/analytics'
import {COMPOSITION_NAME} from 'lambda/config'
import {ArrowDownToLine, ImageIcon, LucideIcon, VideoIcon} from 'lucide-react'
import Link from 'next/link'
import {ReactNode, useEffect} from 'react'
import {toast} from 'sonner'
import {z} from 'zod'
import {Stats} from '~/types/github'
import {Profile} from '~/types/profile'
import {CompositionProps} from '~/types/schema'
import cn from '~/utils/cn'
import download, {STATS_ID, STATS_MOBILE_ID} from '~/utils/save'
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
import Summary from './summary'

const DownloadButton = ({
	onClick,
	Icon,
	children,
	badge,
	className
}: {
	onClick?: () => void
	Icon: LucideIcon
	children: ReactNode
	badge: string
	className?: string
}) => {
	return (
		<button
			className={cn(
				'group flex w-full px-4 py-2 text-xl hover:bg-white hover:text-black ',
				className
			)}
			onClick={onClick}>
			<Icon className='h-[18px] w-[18px]' />
			<div className='flex items-center gap-2 whitespace-nowrap text-lg'>
				{children}
				{badge && (
					<div className='rounded-full border border-neutral-900 bg-[#0d0d0d] px-2 py-0.5 text-xs text-gray-500 group-hover:border-black/20 group-hover:bg-black/10'>
						{badge}
					</div>
				)}
			</div>
		</button>
	)
}

export default function DownloadControls({
	profile,
	inputProps
}: {
	profile: Profile
	inputProps: z.infer<typeof CompositionProps>
}) {
	const {renderMedia, state, undo} = useRendering(COMPOSITION_NAME, inputProps)

	// Automatically download the video once rendered
	useEffect(() => {
		if (typeof window !== 'undefined' && state.status === 'done' && state.url) {
			window.open(state.url, '_blank')
			setTimeout(() => toast.success('Video downloaded'), 1000)
		}
	}, [state])

	if (state.status === 'invoking')
		return <p className='w-full animate-pulse text-white'>Loading...</p>

	if (state.status === 'error')
		return <p className='w-full text-white'>{state.error.message}</p>
	if (state.status === 'rendering')
		return (
			<div className='flex w-full flex-col gap-2'>
				<div className='flex w-full items-center justify-between text-white'>
					<p className='animate-pulse'>Rendering...</p>
					<p>{`${Math.round(state.progress * 100)}%`}</p>
				</div>
				<Progress value={state.progress * 100} />
			</div>
		)

	const downloadVideoButton = (
		<DownloadButton
			badge='MP4'
			className='hidden'
			Icon={VideoIcon}>
			Video
		</DownloadButton>
	)
	let downloadVideoButtonWrapper
	const stats = profile.github_stats as unknown as Stats
	// If already rendered or just finished rendering
	if (state.status === 'done' || (profile.is_rendered && profile.download_url)) {
		const url = profile.download_url
			? profile.download_url
			: state.status === 'done'
				? state.url
				: ''

		downloadVideoButtonWrapper = (
			<Link
				href={url}
				className='no-underline'>
				{downloadVideoButton}
			</Link>
		)
	} else if (state.status === 'init')
		// default state
		downloadVideoButtonWrapper = (
			<AlertDialog>
				<AlertDialogTrigger
					className='group border-none p-0 hover:opacity-80'
					onClick={() => track('Download intent')}>
					{downloadVideoButton}
				</AlertDialogTrigger>

				<AlertDialogContent className='bg-white text-black'>
					<AlertDialogHeader>
						<AlertDialogTitle>Download takes 60-90 seconds!</AlertDialogTitle>
						<AlertDialogDescription>
							Before you can download, you need to render the video. This takes time.
							You only need to render the video once. Please do not navigate away from
							the page while the video is rendering.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className='text-black'>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className='border-none p-0'
							onClick={() => {
								track('Rendering initiated')
								renderMedia()
							}}>
							<span className='h-full w-full rounded-xl border-2 border-black bg-black px-6 py-2 text-white'>
								Start rendering
							</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)

	return (
		<div className='flex flex-col items-center justify-center overflow-hidden rounded-lg border border-neutral-900 backdrop-blur'>
			<div className='flex w-full items-center justify-center gap-1 border-b border-neutral-900 p-1 text-gray-400'>
				<ArrowDownToLine className='h-[16px] w-[16px]' /> Download
			</div>
			<div className='flex w-full flex-col sm:w-fit sm:flex-row'>
				{downloadVideoButtonWrapper}
				<DownloadButton
					Icon={ImageIcon}
					badge='PNG'
					className='border-t border-neutral-900 sm:border-l sm:border-t-0'
					onClick={() => download(stats, false)}>
					Image
				</DownloadButton>
				<DownloadButton
					badge='PNG'
					Icon={ImageIcon}
					className='border-t border-neutral-900 sm:border-l sm:border-t-0'
					onClick={() => download(stats, true)}>
					Image (Mobile)
				</DownloadButton>

				<div className='fixed z-[-100] h-[720px] w-[1280px] scale-[10%] opacity-0'>
					<div
						id={STATS_ID}
						style={{backgroundImage: `url('/assets/sky.jpg')`}}
						className='flex h-full w-full items-center justify-center bg-black'>
						<Summary stats={stats} />
					</div>
				</div>
				<div className='fixed z-[-100] h-[1440px] w-[810px] scale-[10%] opacity-0'>
					<div
						id={STATS_MOBILE_ID}
						style={{backgroundImage: `url('/assets/sky.jpg')`}}
						className='flex h-full w-full items-center justify-center bg-black'>
						<Summary
							stats={stats}
							isMobile={true}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
