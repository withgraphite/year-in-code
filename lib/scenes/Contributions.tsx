import {useCurrentFrame} from 'remotion'
import {Stats} from '../types/github'

import {useMemo} from 'react'
import ContributionGraph, {
	getContributionData
} from '../components/ContributionGraph'

export default function Contributions({
	text,
	from,
	stats
}: {
	text: string
	from: number
	stats: Stats
}) {
	const frame = useCurrentFrame() - from

	const {weeks: data} = useMemo(() => {
		return getContributionData(stats)
	}, [stats])
	const progress = Math.max(0, Math.min(1, frame / 80))

	if (frame < 0) return null

	return {
		from,
		background: undefined,
		camera: undefined,
		content: (
			<>
				<h2 className='headline'>{text}</h2>
				<div className='group relative mb-3 flex max-w-6xl flex-col items-start'>
					<ContributionGraph
						progress={progress}
						weeks={data}
					/>
				</div>
			</>
		)
	}
}
