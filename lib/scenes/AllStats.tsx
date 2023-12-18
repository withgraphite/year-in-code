import {useCurrentFrame} from 'remotion'
import Summary from '../components/summary'
import {Stats} from '../types/github'

export default function AllStats({
	from,
	text,
	stats
}: {
	from: number
	text: string
	stats: Stats
}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: undefined,
		camera: undefined,
		content: <Summary stats={stats} />
	}
}
