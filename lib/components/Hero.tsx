'use client'
import {Session} from '@supabase/supabase-js'
import {motion} from 'framer-motion'
import Link from 'next/link'
import SignInButton from './SignInButton'

export default function Hero({session}: {session: Session}) {
	return (
		<motion.div
			initial={{opacity: 0, scale: 1}}
			animate={{opacity: 1, scale: 1}}
			transition={{delay: 0.3, duration: 0.5}}
			className='z-10 flex h-[450px] w-[450px] flex-col items-center justify-center gap-2 rounded-full bg-gradient-radial from-[#5BDCF9] to-[#2C6FFC] p-10 text-center transition-all duration-300'>
			<h1 className='text-black'>Year in Code</h1>
			<div className='flex flex-col text-xl text-black'>
				<span>End the year with a video</span>
				<span>for your GitHub stats</span>
			</div>
			<div className='flex flex-col items-center gap-3'>
				<SignInButton className='w-full' />
				<Link
					href='/leaderboard'
					className='flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent px-6 py-2 text-base font-thin text-black no-underline transition-all hover:bg-black hover:text-white hover:opacity-100 sm:w-full sm:text-lg'>
					See leaderboard
				</Link>
			</div>
		</motion.div>
	)
}
