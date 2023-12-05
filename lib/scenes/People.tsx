import Image from 'next/image'
import {Sequence} from 'remotion'

export default function People({
	text,
	from,
	people
}: {
	text: string
	from: number
	people: string[]
}) {
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
				<div className='flex gap-5'>
					{people.map(person => (
						<Image
							className='rounded-full'
							src={person}
							width={80}
							height={80}
							alt='person'
							key={person}
						/>
					))}
				</div>
			</div>
		</Sequence>
	)
}
