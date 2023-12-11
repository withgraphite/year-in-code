import {ThreeCanvas} from '@remotion/three'
import {useMemo} from 'react'
import {Sequence, useCurrentFrame, useVideoConfig} from 'remotion'
import Blob from '../components/Blob'

export default function Intro({name, from}) {
	const frame = useCurrentFrame() - from
	const {width, height} = useVideoConfig()
	const starOpacity = Math.min(1, frame / 60)
	const titleOpacity = frame > 120 ? 1 : Math.min(1, frame / 60 - 1)
	const frameScale = frame < 120 ? 1 : Math.min(3, 1 + (frame - 120) / 30)

	const starList = useMemo(
		() =>
			Array.from({length: 500}, _ => ({
				top: Math.random() * 100,
				left: Math.random() * 100,
				width: Math.random() * 3,
				height: Math.random() * 3
			})),
		[]
	)

	return (
		<>
			<Sequence
				from={from}
				durationInFrames={30 * 5}>
				{/* stars */}
				<div
					className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'
					style={{scale: frameScale}}>
					<div
						className='absolute h-full w-full'
						style={{opacity: starOpacity}}>
						{starList.map((star, i) => (
							<div
								key={i}
								className='absolute rounded-full bg-white'
								style={{
									width: star.width,
									height: star.height,
									top: `${star.top}%`,
									left: `${star.left}%`,
									opacity: Math.random() * 0.5 + 0.5
								}}
							/>
						))}
						<ThreeCanvas
							orthographic={false}
							width={width}
							height={height}
							// style={{
							// 	backgroundColor: 'black'
							// }}
							camera={{fov: 75, position: [0, 0, 470]}}>
							<Blob count={frame} />
						</ThreeCanvas>
					</div>
					<div
						style={{opacity: titleOpacity}}
						className='z-10'>
						<h1 className='text-4xl text-white'>Github Wrapped 2023</h1>
						<h2 className='text-center text-2xl text-white'>by Graphite</h2>
					</div>
				</div>
			</Sequence>
		</>
	)
}
