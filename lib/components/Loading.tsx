'use client'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {Stats} from '~/types/github'

export default function Loading({stats}: {stats: Stats}) {
	const [count, setCount] = useState(0)
	const slides = [
		`Hi ${stats.username}`,
		'Welcome to your Year in Code: 2023',
		`You made ${stats.commits} commits in ${stats.year}`,
		`You made ${stats.pulls} pull requests`,
		`Almost done generating your personalized video...`
	]

	useEffect(() => {
		// Start the interval
		const intervalId = setInterval(() => {
			if (count < slides.length - 1) setCount(prevCount => prevCount + 1)
		}, 1.5 * 1000)

		// Clear the interval on component unmount
		return () => clearInterval(intervalId)
	}, [slides])

	return (
		<AnimatePresence>
			<motion.div
				key={count}
				initial={{opacity: 0, y: 50}} // Start from below
				animate={{opacity: 1, y: 0}} // Slide and fade in
				exit={{opacity: 0, y: -50}} // Slide up and fade out
				transition={{duration: 1}}>
				<p className={count === slides.length - 1 ? 'animate-pulse' : ''}>
					{slides[count]}
				</p>
			</motion.div>
		</AnimatePresence>
	)
}
