import {CSSProperties, useMemo} from 'react'
import {Stats} from '../types/github'

import {Trophy} from 'lucide-react'
import Link from 'next/link'
import cn from '../utils/cn'
import {getAssetUrl} from '../utils/url'
import ContributionGraph, {getContributionData} from './ContributionGraph'
import Highlights from './highlights'
import {GraphiteLogo} from './icons/Graphite'
import TopLanguages from './topLanguages'
import TopRepos from './topRepos'

/**
 * All slides in one view for easy sharing
 */
function Summary({
	stats,
	isMobile = false
}: {
	stats: Stats
	isMobile?: boolean
}) {
	const {weeks, max, maxDate, records} = useMemo(() => {
		return getContributionData(stats)
	}, [stats])

	return (
		<>
			<div
				className={cn(
					'relative z-10 flex flex-col items-center justify-center',
					isMobile ? 'p-8' : 'p-4'
				)}>
				<div
					className={cn('relative flex ', isMobile ? 'mb-12 h-[30vh]' : 'h-[80px]')}>
					<img
						className='object-fit h-full w-full'
						src={getAssetUrl('title.webp')}
						alt='2024'
					/>
				</div>

				<div className='grid w-full grid-cols-[1fr_1fr] pb-2 sm:grid-cols-[2fr_1fr]'>
					<div className='flex items-center gap-3'>
						<img
							className='h-[50px] w-[50px] overflow-hidden rounded-full border-[2px] border-white/80 object-cover'
							src={stats.avatarUrl}
						/>
						<div className='text-left'>
							{stats.fullName && (
								<div className='headline -mb-1 w-fit text-[28px] font-bold'>
									{stats.fullName}
								</div>
							)}
							<div className='font-mono text-gray-500'>@{stats.username}</div>
						</div>
					</div>
					{maxDate && max > 4 && (
						<div className='flex items-end justify-end text-right'>
							<div className='flex items-center gap-2'>
								<Trophy className='h-[16px] w-[16px] text-yellow-500' />
								<div className='text-gray-300'>
									{max} contributions on {maxDate}
								</div>
							</div>
						</div>
					)}
				</div>
				<div className='flex w-full justify-center rounded border border-gray-800 bg-black/60 p-2'>
					<ContributionGraph
						weeks={weeks}
						progress={1}
					/>
				</div>

				<div
					className={cn(
						'grid w-full gap-4 pt-4',
						isMobile ? 'grid-cols-1' : 'grid-cols-[2fr_1fr]'
					)}>
					<div className='flex flex-col gap-4 '>
						<Highlights stats={stats} />
						<div
							className={cn('grid gap-4', isMobile ? 'grid-cols-2' : 'grid-cols-4')}>
							{records.map((d, i) => {
								return (
									<div
										key={i}
										className='relative flex flex-1 flex-col items-center justify-center gap-1 rounded border border-gray-800 bg-[#0a0a0a] p-2'>
										<div className='flex w-full items-center gap-2 text-left text-xs text-gray-500'>
											<div className='flex'>{d.icon}</div>
											<div className='fle ellipsis'>{d.title}</div>
										</div>
										<div
											className={cn(
												'ellipsis relative font-mono font-bold uppercase',
												isMobile ? 'text-[48px]' : 'text-[32px]'
											)}>
											<div className='relative z-10'>{d.value}</div>
											<div
												className={`absolute left-0 top-0 h-full w-full opacity-50 blur-[2px]`}>
												{d.value}
											</div>
										</div>
										<div className='ellipsis text-xs text-gray-500'>{d.subtitle}</div>
									</div>
								)
							})}
						</div>
					</div>
					<div
						className={cn('gap-4', isMobile ? 'grid grid-cols-2' : 'flex flex-col')}>
						<TopLanguages stats={stats} />
						<TopRepos stats={stats} />
					</div>
				</div>

				<div className='flex w-full justify-between pt-4 text-gray-400'>
					<GraphiteLogo />
					<Link
						href='https://year-in-code.com'
						target='_blank'
						className='no-underline'>
						year-in-code.com
					</Link>
				</div>
			</div>
			<div
				className='gridded z-1 absolute left-0 top-0 h-full w-full backdrop-blur-[4px]'
				style={
					{
						'--grid-color': 'rgba(255 255 255 / 5%)',
						'--grid-cell-size': '50px'
					} as CSSProperties
				}></div>
		</>
	)
}

export default Summary
