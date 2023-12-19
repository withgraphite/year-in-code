import {useCurrentFrame} from 'remotion'
import Lighting from '../effects/Lighting'
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
				<Number
					frame={frame}
					number={number}
				/>
				<Lighting ambient={{intensity: 0.5}} />
			</>
		),
		camera: undefined,
		content: <h2 className='mb-52'>{text}</h2>,
		number: number
	}
}
