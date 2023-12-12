import {useCurrentFrame} from 'remotion'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import FastTravel from '../environment/FastTravel'
import Sequence from '../video/Sequence'

export default function Times({from, text}: {from: number; text: string}) {
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
					<FastTravel tick={frame} />
				</Canvas>
			}
			content={<h2>{text}</h2>}
		/>
	)
}
