import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import Lighting from '../effects/Lighting'
import Space from '../environment/Space'
import Number from '../objects/Number'

export default function Statistic({
	from,
	text,
	number
}: {
	from: number
	text: string
	number: number
}) {
	const frame = useCurrentFrame() - from
	return {
		from,
		background: (
			<>
				<Space tick={frame} />

				<Number
					frame={frame}
					number={number}
				/>
				<Lighting ambient={{intensity: 0.5}} />
			</>
		),
		camera: (
			<Camera
				position={[0, 0, 400]}
				fov={50}
			/>
		),
		content: <h2 className='mb-52'>{text}</h2>
	}
}
