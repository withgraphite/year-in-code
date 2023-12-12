import {Sequence, useCurrentFrame} from 'remotion'
import Confetti from '~/components/Confetti'

export default function Flashback({dateFrom, dateTo, text, from}) {
	const frame = useCurrentFrame() - from

	// count backwards from dateFrom to dateTo where the initial date shows, and after 60 frames, the final date shows

	const secondsPerFrame =
		(new Date(dateFrom).getTime() - new Date(dateTo).getTime()) / 60

	const date =
		frame < 30
			? dateFrom
			: frame < 90
				? new Date(dateFrom).getTime() - (frame - 30) * secondsPerFrame
				: dateTo

	// Add a condition to apply the zoom effect at a certain frame
	const zoomClass = frame >= 10 ? 'zoom-in' : ''
	// Set the frame to trigger confetti
	const showConfetti = frame === 95

	return (
		<>
			<Sequence
				from={from}
				durationInFrames={30 * 5}>
				<div className='absolute flex h-full w-full flex-col items-center justify-center gap-10 bg-black'>
					<h2 className='z-10 mx-48 text-center text-white/80'>{text}</h2>
					<h1 className={`z-10 mx-48 text-center text-white ${zoomClass}`}>
						{/* date as 0x/0x/xxxx where single digit is prefixed with 0 */}
						{new Date(date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit'
						})}
					</h1>
				</div>
				{showConfetti && <Confetti />}
			</Sequence>
		</>
	)
}
