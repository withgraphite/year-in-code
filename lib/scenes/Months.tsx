import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import MonthsChart from '../components/MonthsChart'
import Space from '../environment/Space'
import {Week} from '../types/github'

export default function Months({
	from,
	text,
	contributions,
	color
}: {
	from: number
	text: string
	contributions: Week[]
	color: string
}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: <Space tick={frame} />,
		camera: (
			<Camera
				position={[0, 0, 400]}
				fov={50}
			/>
		),
		content: (
			<>
				<h2>{text}</h2>
				<div className='flex gap-5'>
					<MonthsChart
						contributions={contributions}
						frame={frame}
						color={color}
					/>
					{/* <FastTravel tick={frame} /> */}
				</div>
			</>
		)
	}
}
