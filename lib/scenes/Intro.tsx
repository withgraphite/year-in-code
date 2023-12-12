import {useCurrentFrame} from 'remotion'
import Canvas from '~/3d/Canvas'
import Camera from '~/camera/Camera'
import Space from '~/environment/Space'
import Planet from '~/objects/Planet'
import FadeIn from '~/transitions/FadeIn'

import Sequence from '~/video/Sequence'

export default function Intro({title, from, planet}) {
	const frame = useCurrentFrame() - from

	const linearFov = 50 + frame / 15
	const exponentialFovStart = 50 + 4 * 2 // The starting value of exponential FOV after 4 seconds
	const exponentialRate = 5 // Adjust this to control the exponential curve
	const transitionDuration = 15 // Duration of the transition period in frames

	const fov =
		frame < 3.5 * 30
			? linearFov
			: frame < 3.5 * 30 + transitionDuration
				? linearFov +
					(exponentialFovStart - linearFov) *
						((frame - 3.5 * 30) / transitionDuration)
				: exponentialFovStart +
					Math.pow((frame - 3.5 * 30 - transitionDuration) / exponentialRate, 2.7)

	return (
		<Sequence
			from={from}
			transitionIn='fade'
			transitionOut='fade'
			background={
				<Canvas
					frame={frame}
					camera={
						<Camera
							position={[0, 0, (300 / (50 + fov / 3)) * 2 * 50]}
							fov={fov}
						/>
					}>
					<Space tick={frame} />
					<Planet
						tick={frame}
						planet={planet}
					/>
				</Canvas>
			}
			content={
				<>
					<FadeIn
						frame={frame}
						delay={60}>
						<h1 className='text-4xl'>{title}</h1>
						<h2 className='text-center text-2xl'>by Graphite</h2>
					</FadeIn>
				</>
			}
		/>
	)
}
