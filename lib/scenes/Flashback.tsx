import {Sequence, useCurrentFrame} from 'remotion'

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

	return (
		<>
			<Sequence
				from={from}
				durationInFrames={30 * 5}>
				<div className='absolute flex h-full w-full flex-col items-center justify-center bg-black'>
					<h2 className='mx-48 text-center text-white'>
						{/* date as 0x/0x/xxxx where single digit is prefixed with 0 */}
						{new Date(date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit'
						})}
					</h2>
					<p className='mx-48 text-center text-white'>{text}</p>
				</div>
			</Sequence>
		</>
	)
}
