import {ThreeCanvas} from '@remotion/three'
import {Sequence, useCurrentFrame, useVideoConfig} from 'remotion'
import BigNumber from '~/components/BigNumber'

export default function Number({
	from,
	text,
	number
}: {
	from: number
	text: string
	number: number
}) {
	const {width, height} = useVideoConfig()

	const frame = useCurrentFrame() - from
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<div className='absolute h-full w-full'>
					<ThreeCanvas
						orthographic={false}
						width={width}
						height={height}
						// style={{
						// 	backgroundColor: 'black'
						// }}
						camera={{fov: 75, position: [0, 0, 470]}}>
						<BigNumber
							count={frame}
							number={number}
						/>
					</ThreeCanvas>
				</div>
				<div
					style={{opacity: 1}}
					className='z-10'>
					<h1 className='text-4xl text-white'>{text}</h1>
				</div>
			</div>
		</Sequence>
	)
}
