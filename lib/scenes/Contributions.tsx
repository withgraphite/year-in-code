import {useCurrentFrame} from 'remotion'

import ContributionGraph from '../components/ContributionGraph'
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
		background: undefined,
		camera: undefined,
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
