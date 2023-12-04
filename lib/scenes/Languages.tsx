import {Sequence} from 'remotion'

export default function Languages({
	text,
	from,
	languages
}: {
	text: string
	from: number
	languages: string[]
}) {
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
				<div className='flex gap-5'>
					{languages.map(language => (
						<div
							className='text-white'
							key={language}>
							{language}
						</div>
					))}
				</div>
			</div>
		</Sequence>
	)
}
