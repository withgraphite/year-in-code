import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import Summary from '../components/summary'
import Space from '../environment/Space'
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
		background: <Space tick={frame} />,
		camera: (
			<Camera
				position={[0, 0, 400]}
				fov={50}
			/>
		),
		content: <Summary stats={stats} />
	}
}
