import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion'

export default function Video({title}) {
	const {fps} = useVideoConfig()

	const transitionStart = 2 * fps
	const transitionDuration = 1 * fps

	return (
		<AbsoluteFill>
			<Sequence durationInFrames={transitionStart + transitionDuration}>
				<div className='absolute flex h-full w-full items-center justify-center bg-black'>
					<h1 className='text-white'>VIDEO</h1>
				</div>
			</Sequence>
			<Sequence from={transitionStart + transitionDuration / 2}>
				<div className='absolute flex h-full w-full items-center justify-center bg-black'>
					<code className='text-xs text-white'>{title}</code>
				</div>
			</Sequence>
		</AbsoluteFill>
	)
}
