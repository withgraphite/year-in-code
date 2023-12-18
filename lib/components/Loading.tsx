'use client'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {Stats} from '~/types/github'
import Stopwatch from './Stopwatch'

export default function Loading({stats}: {stats: Stats}) {
	const [count, setCount] = useState(0)

	const slides = [
		<span key='1'>
			Hi <b>{stats.username}</b>!
		</span>,
		'Welcome to your Year in code.',
		'We are generating your video right now...',
		<span key='2'>
			This usually takes <b>60 to 90 seconds</b>.
		</span>,
		'Hang tight...',
		`In the meantime, let's reflect on your year.`,
		<span key='3'>
			In {stats.year}, you made <b>{stats.commits} commits</b>.
		</span>,
		<span key='4'>
			You also opened <b>{stats.pulls} pull requests</b>.
		</span>,
		<span key='5'>
			In return, you gave <b>{stats.reviews} reviews</b>.
		</span>,
		`Almost done generating your video...`
	]

	useEffect(() => {
		let slidesLength = 10
		// Start the interval
		const intervalId = setInterval(() => {
			if (count < slidesLength - 1) setCount(prevCount => prevCount + 1)
		}, 2.5 * 1000)

		// Clear the interval on component unmount
		return () => clearInterval(intervalId)
	}, [count])

	return (
		<div className='relative flex w-full flex-col items-center'>
			<AnimatePresence>
				<motion.div
					className='absolute left-0 right-0 flex h-10 w-full items-center justify-center text-center'
					key={count}
					initial={{opacity: 0, y: 0}} // Start from below
					animate={{opacity: 1, y: 0}} // Slide and fade in
					exit={{opacity: 0, y: 0}} // Slide up and fade out
					transition={{duration: 0.6, ease: 'easeInOut'}}
					layout>
					<h2
						className={`${
							count === slides.length - 1 ? 'animate-pulse' : ''
						} font-thin`}>
						{slides[count]}
					</h2>
				</motion.div>
			</AnimatePresence>
			<Stopwatch />
		</div>
	)
}
