'use client'

import {track} from '@vercel/analytics/react'
import clsx from 'clsx'
import {GitPullRequest} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SignInButton from '~/components/SignInButton'
import Tooltip from '~/components/Tooltip'
import {DEFAULT_META, META} from '~/constants/metadata'
import {TRACKING} from '~/constants/tracking'
import GraphiteIcon from '~/icons/GraphiteIcon'
import {LeaderboardHero} from './icons/svgs'

export const dynamic = 'force-dynamic'

export const metadata = {
	...DEFAULT_META,
	title: 'Leaderboard | ' + META.title,
	description: 'See who opened the most pull requests. ' + META.desc,
	openGraph: {
		title: 'Leaderboard | ' + META.title,
		description: 'See who opened the most pull requests. ' + META.desc
	},
	twitter: {
		title: 'Leaderboard | ' + META.title,
		description: 'See who opened the most pull requests. ' + META.desc
	}
}

function LineItem({index, data}: {index: number; data: any}) {
	const {
		avatar_url: avatarUrl,
		company,
		is_graphite_user: isGraphiteUser,
		pull_requests_opened: pullRequestsOpened,
		user_name: userName
	} = data

	const commonClassNames = clsx(
		'px-4 py-2 group-hover:bg-[#1a1a1a] flex items-center border-neutral-800',
		index % 2 === 0 && 'bg-[#161616]'
	)

	return (
		<div className='group contents'>
			<div
				className={clsx(
					'justify-center border-b border-r font-mono text-sm text-white/50',
					commonClassNames
				)}>
				{index + 1}
			</div>
			<div
				className={clsx(
					'flex gap-2 overflow-hidden border-b border-r',
					commonClassNames
				)}>
				<div className='relative h-[24px] w-[24px] flex-shrink-0 overflow-hidden rounded-full border border-neutral-800'>
					{avatarUrl && (
						<Image
							src={avatarUrl}
							width={24}
							height={24}
							className='absolute left-0 top-0 h-full w-full object-cover'
							alt={`Profile picture`}
						/>
					)}
				</div>
				<Link
					href={`/${userName}`}
					className='flex-shrink-0 no-underline hover:underline'>
					<p>{userName}</p>
				</Link>
				{company && (
					<p className='hidden flex-shrink-0 text-white/60 sm:flex'>
						{company}
					</p>
				)}
			</div>
			<div
				className={clsx(
					'flex justify-center border-b border-r p-4',
					commonClassNames
				)}>
				{isGraphiteUser && (
					<div
						className='h-[12px] w-[12px] rounded-full border border-neutral-800 bg-current text-green-500'
						style={{
							boxShadow: '0 0 4px black inset'
						}}></div>
				)}
			</div>

			<div
				className={clsx(
					'justify-center border-b p-4 font-mono text-sm',
					commonClassNames
				)}>
				{pullRequestsOpened}
			</div>
		</div>
	)
}

export const Leaderboard = ({data, session}: {data: any; session: any}) => {
	const labelClassNames =
		'relative sticky top-0 z-10 border-b border-neutral-700 py-2 px-4 text-left backdrop-blur-lg bg-black/60 text-sm text-white/80 flex items-center font-bold'

	return (
		<div
			className='fixed left-1/2 top-1/2 z-10 flex h-[80vh] w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-hidden rounded-lg border border-neutral-700 bg-black sm:w-full'
			style={{
				maxWidth: 'min(calc(100% - 2rem), 42rem)'
			}}>
			<div className='flex w-full flex-col border-b border-neutral-700'>
				<LeaderboardHero className='h-full w-full border-b border-neutral-700 text-neutral-700' />
				<h1 className='headline w-fit p-4 pb-2 font-bold'>Leaderboard</h1>
				<div className='flex flex-col border-b border-neutral-700 p-4 pt-0 text-xl text-white/60 [text-wrap:pretty]'>
					See how you stack up against the developers who shipped the most pull
					requests in 2024.
				</div>
				<div className='text-md flex w-full flex-row'>
					<Link
						href={META.domain.web}
						onClick={() => track(TRACKING.VISIT_GRAPHITE)}
						target={'_blank'}
						className='flex w-full flex-nowrap items-center justify-center gap-2 px-4 py-2 no-underline hover:bg-white hover:text-black'>
						<GitPullRequest />
						Merge more PRs with Graphite
					</Link>
					{!session && (
						<SignInButton className='w-full whitespace-nowrap rounded-none border-l border-neutral-700 bg-black text-white hover:bg-white hover:text-black' />
					)}
				</div>
			</div>

			<div className='flex w-full flex-1 flex-col overflow-y-scroll'>
				<div className='grid grid-cols-[1fr_auto_1fr_1fr]'>
					<div className='contents whitespace-nowrap'>
						<div className={clsx(labelClassNames, 'border-r')}>Rank</div>
						<div className={clsx(labelClassNames, 'border-r')}>User</div>
						<div
							className={clsx(labelClassNames, 'relative z-20 border-r')}
							style={{padding: 0}}>
							<Tooltip
								body='Uses Graphite'
								position='bottom'
								className='h-full w-full font-normal normal-case'>
								<Link
									href={META.domain.web}
									target='_blank'
									className='absolute left-0 top-0 h-full w-full'
									onClick={() => track(TRACKING.VISIT_GRAPHITE)}>
									<GraphiteIcon className='h-full w-full fill-white p-1' />
								</Link>
							</Tooltip>
						</div>
						<div className={labelClassNames}>PRs</div>
					</div>

					<div className='contents'>
						{data.map((item, i) => (
							<LineItem
								key={item.user_name}
								index={i}
								data={item}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
