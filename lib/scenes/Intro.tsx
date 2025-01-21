import {useCurrentFrame} from 'remotion'
import {Year} from '../components/icons/svgs'
import FastTravel from '../environment/FastTravel'
import Camera from './../camera/Camera'
import Planet from './../objects/Planet'

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

	return {
		from,
		background:
			frame < 120 ? (
				<>
					<Planet
						tick={frame}
						planet={planet}
					/>
				</>
			) : (
				<FastTravel
					tick={frame}
					speed={-2.5 + 0.02 * (frame - 125)}
				/>
			),
		camera:
			frame < 120 ? (
				<Camera
					position={[0, 0, (300 / (30 + fov * 1.1)) * 2 * 50]}
					fov={fov}
				/>
			) : (
				<Camera
					position={[0, 0, 100]}
					fov={1 + 6 * (frame - 120)}
				/>
			),
		content: (
			<div className='relative flex flex-col items-center gap-4'>
				<Year
					className='w-[320px] text-white/80'
					stroke='none'
				/>
				<h1 className='headline font-bold'>{title}</h1>
			</div>
		)
	}
}
