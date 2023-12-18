import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import FastTravel from '../environment/FastTravel'

export default function Stars({text, from}: {text: string; from: number}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: (
			<FastTravel
				tick={frame}
				speed={1}
			/>
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
