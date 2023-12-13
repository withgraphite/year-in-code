import {useCurrentFrame} from 'remotion'
import Canvas from '~/3d/Canvas'
import Camera from '~/camera/Camera'
import Space from '~/environment/Space'
import Sequence from '../video/Sequence'

export default function Stars({
	text,
	from,
	stars
}: {
	text: string
	from: number
	stars: number
}) {
	const frame = useCurrentFrame() - from

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
							fov={50}
						/>
					}>
					<Space tick={frame} />
				</Canvas>
			}
			content={
				<>
					{[...Array(stars)].map((_, i) => (
						<div
							key={i}
							className='absolute h-[2px] w-[2px] rounded-full bg-white'
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animation: `stars ${Math.random() * 5 + 5}s infinite`
							}}
						/>
					))}
					<h2>{text}</h2>
				</>
			}
		/>
	)
}
