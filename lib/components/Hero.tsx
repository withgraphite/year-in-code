'use client'
import {Session} from '@supabase/supabase-js'
import {motion} from 'framer-motion'
import Link from 'next/link'
import SignInButton from './SignInButton'
import Timer from './Timer'

export default function Hero({session}: {session: Session}) {
	return (
		<motion.div
			initial={{opacity: 0, scale: 1}}
			animate={{opacity: 1, scale: 1}}
			transition={{delay: 0.3, duration: 0.5}}
			className='z-10 flex h-[95vw] w-[95vw] flex-col items-center justify-center gap-6 rounded-full bg-gradient-radial from-[#5BDCF9] to-[#2C6FFC] p-10 text-center transition-all duration-300 sm:h-[450px] sm:w-[450px]'>
			<div className='flex flex-col gap-3'>
				<h1 className='text-black'>Year in code</h1>
				<div className='flex flex-col text-xl text-black'>
					<span>End the year with a video</span>
					<span>for your GitHub stats</span>
				</div>
			</div>

			{process.env.NODE_ENV === 'development' ? (
				<div className='flex flex-col items-center gap-3'>
					<SignInButton className='w-full' />
					<Link
						href='/leaderboard'
						className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent px-6 py-2 text-base font-thin text-black no-underline transition-all hover:bg-black hover:text-white hover:opacity-100 sm:w-full sm:text-lg'>
						See leaderboard
					</Link>
				</div>
			) : (
				<div className='flex w-full flex-col items-center gap-1'>
					<Timer targetDateTime={new Date('12/19/2023 00:00:00')} />
					<p className='font-light text-black/50'>Coming soon</p>
				</div>
			)}
		</motion.div>
	)
}
