import {useCurrentFrame} from 'remotion'

export default function People({
	text,
	from,
	people
}: {
	text: string
	from: number
	people: string[]
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
					{people.map((person, i) => (
						<div
							key={i}
							style={{opacity: frame > i * 30 ? frame / 30 - i : 0}}>
							<img
								className='rounded-full'
								src={person}
								width={80}
								height={80}
								alt={`${person} avatar`}
							/>
						</div>
					))}
				</div>
			</>
		)
	}
}
