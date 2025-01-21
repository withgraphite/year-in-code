import {useCurrentFrame} from 'remotion'
import MonthsChart from '../components/MonthsChart'
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
		background: undefined,
		camera: undefined,
		content: (
			<>
				<h2 className='headline'>{text}</h2>
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
