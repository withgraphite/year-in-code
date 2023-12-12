import {Sequence, useCurrentFrame} from 'remotion'
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
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
				<div className='flex gap-5'>
					<MonthsChart
						contributions={contributions}
						frame={frame}
						color={color}
					/>
					{/* <FastTravel tick={frame} /> */}
				</div>
			</div>
		</Sequence>
	)
}
