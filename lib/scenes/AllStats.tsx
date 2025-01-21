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
	return {
		from,
		background: undefined,
		camera: undefined,
		content: <Summary stats={stats} />
	}
}
