import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import Space from '../environment/Space'

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
		)
	}
}
