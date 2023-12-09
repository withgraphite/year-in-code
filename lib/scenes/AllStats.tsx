import {Sequence} from 'remotion'

export default function AllStats({from}: {from: number}) {
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>ALL STATS</h2>
				<div className='flex gap-5'></div>
			</div>
		</Sequence>
	)
}
