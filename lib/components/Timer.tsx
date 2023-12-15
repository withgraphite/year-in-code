'use client'

import {useEffect, useState} from 'react'

export default function Timer() {
	const [seconds, setSeconds] = useState(0)

	const formatTime = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds % 60
		return (
			<div className='flex w-20 items-center justify-between text-stone-500 2xl:w-40'>
				<span className='flex w-2/5 justify-end'>
					{minutes.toString().padStart(2, '0')}
				</span>
				<span className='flex w-1/5 items-center justify-center'>:</span>
				<span className='flex w-2/5'>{seconds.toString().padStart(2, '0')}</span>
			</div>
		)
	}

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setSeconds(prev => prev + 1)
		}, 1 * 1000)

		// Clear the interval on component unmount
		return () => clearInterval(timerInterval)
	}, [])

	return (
		<div className='absolute top-12 h-10 text-2xl font-extralight text-black/50 2xl:text-4xl'>
			{formatTime(seconds)}
		</div>
	)
}
