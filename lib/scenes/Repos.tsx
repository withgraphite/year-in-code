import {useCurrentFrame} from 'remotion'
import Canvas from '~/3d/Canvas'
import Camera from '~/camera/Camera'
import Space from '~/environment/Space'
import Sequence from '../video/Sequence'

export default function Repos({
	from,
	text,
	repos
}: {
	from: number
	text: string
	repos: {name: string; color: string}[]
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
					<div className='flex gap-5'>
						{repos.map((repo, i) => (
							<div
								style={{
									opacity: frame > i * 30 ? frame / 30 - i : 0,
									color: repo.color
								}}
								className={`text-2xl text-white`}
								key={repo.name}>
								{repo.name}
							</div>
						))}
					</div>
				</>
			}
		/>
	)
}
