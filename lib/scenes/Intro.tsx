import {useCurrentFrame} from 'remotion'
import FastTravel from '../environment/FastTravel'
import FadeOut from '../transitions/FadeOut'
import Canvas from './../3d/Canvas'
import Camera from './../camera/Camera'
import Space from './../environment/Space'
import Planet from './../objects/Planet'
import FadeIn from './../transitions/FadeIn'
import Sequence from './../video/Sequence'

export default function Intro({title, from, planet}) {
	const frame = useCurrentFrame() - from

	const linearFov = 50 + frame / 15
	const exponentialFovStart = 50 + 4 * 2 // The starting value of exponential FOV after 4 seconds
	const exponentialRate = 5 // Adjust this to control the exponential curve
	const transitionDuration = 15 // Duration of the transition period in frames

	const fov =
		frame < 2.5 * 30
			? linearFov
			: frame < 2.5 * 30 + transitionDuration
				? linearFov +
					(exponentialFovStart - linearFov) *
						((frame - 2.5 * 30) / transitionDuration)
				: exponentialFovStart +
					Math.pow((frame - 2.5 * 30 - transitionDuration) / exponentialRate, 2.7)

	return (
		<Sequence
			from={from}
			transitionIn='fade'
			transitionOut='warp'
			background={
				<>
					<div style={{opacity: frame < 120 ? 1 : 0}}>
						<Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0, (300 / (30 + fov * 1.1)) * 2 * 50]}
									fov={fov}
								/>
							}>
							<Space tick={frame} />
							<Planet
								tick={frame}
								planet={planet}
							/>
						</Canvas>
					</div>
					<div
						style={{
							opacity: frame < 120 || frame > 160 ? 0 : 1,
							display: frame < 120 || frame > 160 ? 'none' : 'block'
						}}>
						<Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0, 100]}
									fov={1 + 6 * (frame - 120)}
								/>
							}>
							<FastTravel
								tick={frame}
								speed={-2.5 + 0.02 * (frame - 125)}
							/>
						</Canvas>
					</div>
					<div
						style={{
							opacity: frame < 135 ? 0 : 1,
							display: frame < 135 ? 'none' : 'block'
						}}>
						{/* <Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0, 1000]}
									fov={90}
								/>
							}>
							
							<Space tick={frame * frame} />
						</Canvas> */}
						{/* <Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0, 1300]}
									fov={0.1}
								/>
							}>
							<FastTravel
								tick={frame}
								speed={-0.5 + 0.01 * (frame - 135)}
							/>
						</Canvas> */}
					</div>
				</>
			}
			content={
				<>
					<FadeIn
						frame={frame}
						delay={60}>
						<FadeOut
							frame={frame}
							duration={10}
							delay={100}>
							<h1 className='text-4xl'>{title}</h1>
							<h2 className='text-center text-2xl'>by Graphite</h2>
						</FadeOut>
					</FadeIn>
				</>
			}
		/>
	)
}
