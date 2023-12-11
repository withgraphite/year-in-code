import {Sequence, useCurrentFrame} from 'remotion'

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
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
				<div className='flex gap-5'>
					{repos.map((repo, i) => (
						<div
							style={{opacity: frame > i * 30 ? frame / 30 - i : 0, color: repo.color}}
							className={`text-2xl text-white`}
							key={repo.name}>
							{repo.name}
						</div>
					))}
				</div>
			</div>
		</Sequence>
	)
}
