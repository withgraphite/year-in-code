import {useCurrentFrame} from 'remotion'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import WormHole from '../environment/WarpDrive'
import useRamp from '../keyframes/useRamp'
import FadeIn from '../transitions/FadeIn'
import Sequence from '../video/Sequence'

export default function Flashback({dateFrom, dateTo, text, from}) {
	const frame = useCurrentFrame() - from

	const secondsPerFrame =
		(new Date(dateFrom).getTime() - new Date(dateTo).getTime()) / 60

	const date =
		frame < 30
			? dateFrom
			: frame < 90
				? new Date(dateFrom).getTime() - (frame - 30) * secondsPerFrame
				: dateTo

	const speed = useRamp(2, -2, 150, frame)

	return (
		<Sequence
			from={from}
			transitionIn='fade'
			transitionOut='warp'
			background={
				<Canvas
					frame={frame}
					camera={
						<Camera
							position={[0, 0, 400]}
							fov={50 + frame / 30}
						/>
					}>
					<WormHole
						tick={frame}
						speed={speed}
					/>
				</Canvas>
			}
			content={
				<>
					<FadeIn
						frame={frame}
						delay={30}>
						<h2 className='text-white/80'>{text}</h2>
						<h1 className='text-center'>
							{new Date(date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit'
							})}
						</h1>
					</FadeIn>
				</>
			}
		/>
	)
}
