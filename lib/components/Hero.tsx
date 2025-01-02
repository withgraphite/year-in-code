'use client'
import {Session} from '@supabase/supabase-js'
import {track} from '@vercel/analytics/react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import {TRACKING} from '~/constants/tracking'
import SignInButton from './SignInButton'

export default function Hero({session}: {session: Session}) {
	return (
		<motion.div
			initial={{opacity: 0, scale: 1}}
			animate={{opacity: 1, scale: 1}}
			transition={{delay: 0.3, duration: 0.5}}
			className='z-10 flex flex-col items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-black transition-all duration-300 sm:w-[450px]'>
			<div className='flex w-full flex-col'>
				<img
					src='/assets/title.webp'
					alt='Year in code 2024 title'
					className='border-b border-white/20'
				/>
				<h1 className='flex flex-row items-center p-4 pb-2 text-[32px] text-white/30'>
					<span className='headline w-fit font-bold'>Year in code</span>
					<div className=''>
						&nbsp;by&nbsp;
						<Link
							className='no-underline hover:text-white'
							href={META.domain.web}
							target='_blank'
							onClick={() => track(TRACKING.VISIT_GRAPHITE)}>
							Graphite
						</Link>
					</div>
				</h1>
				<div className='flex flex-col p-4 pt-0 text-lg text-white/50 [text-wrap:pretty]'>
					Look back on your 2024 coding journey. Explore your contributions and
					impact over the year with a generative video.
				</div>
			</div>

			<div className='flex w-full flex-row items-center border-t border-white/20'>
				<Link
					href='/leaderboard'
					className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent p-4 font-thin no-underline transition-all hover:bg-black hover:text-white sm:w-full'>
					<ChartNoAxesColumn /> Leaderboard
				</Link>
				<SignInButton className='h-full w-full' />
			</div>
		</motion.div>
	)
}
