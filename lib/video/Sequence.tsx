import {ReactNode} from 'react'
import {Sequence as RemotionSequence, useCurrentFrame} from 'remotion'
import FadeIn from '../transitions/FadeIn'

interface SequenceProps {
	from: number
	transitionIn: 'fade' | 'zoom' | 'warp'
	transitionOut: 'fade' | 'zoom' | 'warp'
	background: ReactNode
	content: ReactNode
}

export default function Sequence({
	from,
	transitionIn,
	transitionOut,
	background,
	content
}: SequenceProps) {
	const frame = useCurrentFrame() - from

	switch (transitionIn) {
		case 'fade':
			return (
				<FadeIn frame={frame}>
					<RemotionSequence
						from={from}
						durationInFrames={5 * 30}>
						<div className='absolute'>{background}</div>
						<div className='absolute z-10 h-full w-full text-white'>
							<div
								className='flex h-full w-full flex-col items-center justify-center gap-10 p-24 text-center
							'>
								{content}
							</div>
						</div>
					</RemotionSequence>
				</FadeIn>
			)
		default:
			return (
				<RemotionSequence
					from={from}
					durationInFrames={5 * 30}>
					<div className='absolute'>{background}</div>
					<div className='absolute z-10 h-full w-full text-white'>
						<div
							className='flex h-full w-full flex-col items-center justify-center gap-10 p-24 text-center
							'>
							{content}
						</div>
					</div>
				</RemotionSequence>
			)
	}
}
