import {Sequence} from 'remotion'

export default function Number({
	from,
	text,
	number
}: {
	from: number
	text: string
	number: number
}) {
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
				<div className='flex gap-5'>NUMBER {number}</div>
			</div>
		</Sequence>
	)
}
