import {Sequence} from 'remotion'

export default function Stars({
	text,
	from,
	stars
}: {
	text: string
	from: number
	stars: number
}) {
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full items-center justify-center bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
			</div>
			{[...Array(stars)].map((_, i) => (
				<div
					key={i}
					className='absolute h-[2px] w-[2px] rounded-full bg-white'
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
						animation: `stars ${Math.random() * 5 + 5}s infinite`
					}}
				/>
			))}
		</Sequence>
	)
}
