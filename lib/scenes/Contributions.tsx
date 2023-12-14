import {useCurrentFrame} from 'remotion'
import Sequence from '../video/Sequence'

import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import ContributionGraph from '../components/ContributionGraph'
import Space from '../environment/Space'
import {Week} from '../types/github'

export default function Contributions({
	text,
	from,
	weeks
}: {
	text: string
	from: number
	weeks: Week[]
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
					<ContributionGraph
						weeks={weeks}
						frame={frame}
					/>
				</>
			}
		/>
	)
}
