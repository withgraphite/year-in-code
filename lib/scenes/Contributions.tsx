import {useCurrentFrame} from 'remotion'

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
				<ContributionGraph
					weeks={weeks}
					frame={frame}
				/>
			</>
		)
	}
}
