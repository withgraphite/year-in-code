import {useCurrentFrame} from 'remotion'
import Canvas from '~/3d/Canvas'
import Camera from '~/camera/Camera'
import Space from '~/environment/Space'
import MonthsChart from '../components/MonthsChart'
import {Week} from '../types/github'
import Sequence from '../video/Sequence'

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
			}
		/>
	)
}
