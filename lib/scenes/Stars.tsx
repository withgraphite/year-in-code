import {useCurrentFrame} from 'remotion'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import FastTravel from '../environment/FastTravel'
import Sequence from '../video/Sequence'

export default function Stars({text, from}: {text: string; from: number}) {
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
					<FastTravel
						tick={frame}
						speed={1}
					/>
				</Canvas>
			}
			content={
				<>
					{/* {[...Array(stars)].map((_, i) => (
						<div
							key={i}
							className='absolute h-[2px] w-[2px] rounded-full bg-white'
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animation: `stars ${Math.random() * 5 + 5}s infinite`
							}}
						/>
					))} */}
					<h2>{text}</h2>
				</>
			}
		/>
	)
}
