import {useCurrentFrame} from 'remotion'
import Summary from '~/components/summary'
import {Stats} from '~/types/github'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import Space from '../environment/Space'
import Sequence from '../video/Sequence'

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
					<Summary stats={stats} />
				</>
			}
		/>
	)
}
