'use client'
import {useEffect, useState} from 'react'

export default function Timer({targetDateTime}: {targetDateTime: Date}) {
	const [timeLeft, setTimeLeft] = useState(0)

	const calculateTimeLeft = () => {
		const now = new Date()
		const difference = targetDateTime.getTime() - now.getTime()
		return difference > 0 ? difference : 0 // Avoid negative time
	}

	const formatTime = totalMilliseconds => {
		const totalSeconds = Math.floor(totalMilliseconds / 1000)
		const days = Math.floor(totalSeconds / (3600 * 24))
		const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60
		return (
			<div className='flex w-full items-center justify-between gap-1'>
				<p className='flex w-1/4 items-end gap-1 text-center'>
					<span className='w-1/2'>{days.toString().padStart(2, '0')}</span>
					<span className='w-1/2 pb-0.5 text-left text-base'>days</span>
				</p>
				<span>:</span>
				<p className='flex w-1/4 items-end gap-1 text-center'>
					<span className='w-1/2'>{hours.toString().padStart(2, '0')}</span>
					<span className='w-1/2 pb-0.5 text-left text-base'>hrs</span>
				</p>
				<span>:</span>
				<p className='flex w-1/4 items-end gap-1 text-center'>
					<span className='w-1/2'>{minutes.toString().padStart(2, '0')}</span>
					<span className='w-1/2 pb-0.5 text-left text-base'>min</span>
				</p>
				<span>:</span>
				<p className='flex w-1/4 items-end gap-1 text-center'>
					<span className='w-1/2'>{seconds.toString().padStart(2, '0')}</span>
					<span className='w-1/2 pb-0.5 text-left text-base'>sec</span>
				</p>
			</div>
		)
	}

	useEffect(() => {
		setTimeLeft(calculateTimeLeft())

		const timerInterval = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000) // Update every second

		// Clear the interval on component unmount
		return () => clearInterval(timerInterval)
	}, [targetDateTime])

	return (
		<div className='flex w-full flex-col gap-1 font-extralight text-black/50 sm:px-5'>
			<p className='text-3xl 2xl:text-4xl'>{formatTime(timeLeft)}</p>
		</div>
	)
}
