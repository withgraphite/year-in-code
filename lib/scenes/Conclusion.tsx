import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import Space from '../environment/Space'
import Earth from '../objects/Earth'

export default function Conclusion({text, from}: {text: string; from: number}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: (
			<>
				<Space tick={frame} />
				<Earth
					tick={frame}
					rotation={frame}
				/>
			</>
		),
		camera: (
			<Camera
				position={[0, 0, 400]}
				fov={50}
			/>
		),
		content: <h2>{text}</h2>
	}
}
