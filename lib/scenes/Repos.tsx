import {useCurrentFrame} from 'remotion'

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
		background: undefined,
		camera: undefined,
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
