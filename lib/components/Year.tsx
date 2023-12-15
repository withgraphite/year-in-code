'use client'
import {motion} from 'framer-motion'

export default function Year() {
	return (
		<div className='absolute flex h-screen w-full items-center justify-center overflow-hidden p-5 text-center'>
			<motion.div
				initial={{opacity: 0, scale: 0.8}}
				animate={{opacity: 1, scale: 1}}
				transition={{duration: 0.3}}
				className='flex flex-col text-[280px] text-black/50 md:text-[350px] lg:flex-row lg:gap-[300px] lg:text-[450px]'>
				<div className='flex gap-5 md:gap-10 lg:gap-0'>
					<span>2</span>
					<span>0</span>
				</div>
				<div className='flex gap-5 md:gap-10 lg:gap-0'>
					<span>2</span>
					<span>3</span>
				</div>
			</motion.div>
		</div>
	)
}
