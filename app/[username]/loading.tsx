'use client'
import {useEffect, useState} from 'react'

export default function Loading() {
	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds(prev => prev + 1)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	// Utility function to convert seconds to minutes and seconds format
	const formatTime = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds % 60

		// Formatting to ensure two digits
		const formattedMinutes = String(minutes).padStart(2, '0')
		const formattedSeconds = String(seconds).padStart(2, '0')

		return `${formattedMinutes}:${formattedSeconds}`
	}

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			<h3 className='animate-pulse'>Generating...</h3>
			<p>This usually takes ~30 seconds.</p>
			<p>{formatTime(seconds)}</p>
		</div>
	)
}
