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
			className='z-10 flex h-[80vw] w-[80vw] flex-col items-center justify-center gap-2 rounded-full bg-gradient-radial from-[#5BDCF9] to-[#2C6FFC] p-5 text-center transition-all duration-300 sm:h-[60vw] sm:w-[60vw] sm:gap-5 sm:p-10 md:h-[50vw] md:w-[50vw] lg:p-12 xl:h-[35vw] xl:w-[35vw] 2xl:h-[25vw] 2xl:w-[25vw]'>
			<h1 className='text-black'>Year in Code</h1>
			<div className='flex flex-col text-black lg:text-xl'>
				<span>End the year with a video</span>
				<span>for your GitHub stats</span>
			</div>
			<div className='flex flex-col items-center gap-3'>
				<SignInButton className='w-full' />
				<Link
					href='/leaderboard'
					className='flex w-fit items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent px-6 py-2 text-base font-thin text-black no-underline transition-all hover:bg-black hover:text-white hover:opacity-100 sm:w-full sm:text-lg'>
					See Leaderboard
				</Link>
			</div>
		</motion.div>
	)
}
