'use client'
import {track} from '@vercel/analytics/react'
import {motion} from 'framer-motion'
import {ChartNoAxesColumn} from 'lucide-react'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import {TRACKING} from '~/constants/tracking'
import SignInButton from './SignInButton'

export default function Hero() {
	return (
		<>
			<motion.div
				layoutId='modal'
				transition={{
					duration: 0.3,
					ease: 'easeInOut'
				}}
				className='z-10 flex flex-col items-center justify-center rounded-lg border border-neutral-700 bg-black sm:w-[450px] '>
				<div className='flex w-full flex-col'>
					<motion.img
						initial={{filter: 'blur(8px)', opacity: 0}}
						animate={{filter: 'blur(0px)', opacity: 1}}
						exit={{filter: 'blur(8px)', opacity: 0}}
						transition={{
							delay: 0.2
						}}
						src='/assets/title.webp'
						alt='Year in code 2024 title'
						className='border-b border-neutral-700'
					/>
					<motion.h1
						// initial={{opacity: 0}}
						// animate={{opacity: 1}}
						// exit={{opacity: 0}}
						// transition={{
						// 	delay: 0.5
						// }}
						className='flex flex-row items-center p-4 pb-0 text-[32px] text-white/30'>
						<span className='headline w-fit font-bold leading-none'>
							Year in code
						</span>
						<div className='font-bold leading-none tracking-tight'>
							&nbsp;by&nbsp;
							<Link
								className='no-underline hover:text-white'
								href={META.domain.web}
								target='_blank'
								onClick={() => track(TRACKING.VISIT_GRAPHITE)}>
								Graphite
							</Link>
						</div>
					</motion.h1>
					<motion.div
						// initial={{opacity: 0}}
						// animate={{opacity: 1}}
						// exit={{opacity: 0}}
						// transition={{
						// 	delay: 0.75
						// }}
						className='flex flex-col p-4 text-lg text-white/50 [text-wrap:pretty]'>
						Look back on your 2024 coding journey with a personalized highlight reel
						and stats page. Visualize your contributions and see how you stack up
						against other devs around the world.
					</motion.div>
				</div>

				<div className='flex w-full flex-row items-center border-t border-neutral-700'>
					<Link
						href='/leaderboard'
						className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent p-4 no-underline transition-all hover:bg-black hover:text-white sm:w-full'>
						<ChartNoAxesColumn /> Leaderboard
					</Link>
					<SignInButton className='h-full w-full' />
				</div>
				<div className='absolute bottom-0 right-1/2 -translate-x-1/2 -translate-y-full p-4 text-white'>
					Disclaimer
				</div>
			</motion.div>
		</>
	)
}
