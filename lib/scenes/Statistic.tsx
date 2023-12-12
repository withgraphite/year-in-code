import {useCurrentFrame} from 'remotion'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import Lighting from '../effects/Lighting'
import Space from '../environment/Space'
import Number from '../objects/Number'
import FadeIn from '../transitions/FadeIn'
import Sequence from '../video/Sequence'

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
	return (
		<Sequence
			from={from}
			transitionIn='fade'
			transitionOut='warp'
			background={
				<div className='mt-16'>
					<FadeIn
						frame={frame}
						delay={30}>
						<Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0, 400]}
									fov={50}
								/>
							}>
							<Space tick={frame} />

							<Number
								frame={frame}
								number={number}
							/>
							<Lighting ambient={{intensity: 0.5}} />
						</Canvas>
					</FadeIn>
				</div>
			}
			content={<h1 className='mb-52 text-4xl text-white'>{text}</h1>}
		/>
	)
}
