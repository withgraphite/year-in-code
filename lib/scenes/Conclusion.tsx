import {useCurrentFrame} from 'remotion'
import Canvas from '~/3d/Canvas'
import Camera from '~/camera/Camera'
import Space from '~/environment/Space'
import Earth from '~/objects/Earth'
import Sequence from '~/video/Sequence'

export default function Conclusion({text, from}: {text: string; from: number}) {
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
					<Earth
						tick={frame}
						rotation={frame}
					/>
				</Canvas>
			}
			content={<h2>{text}</h2>}
		/>
	)
}
