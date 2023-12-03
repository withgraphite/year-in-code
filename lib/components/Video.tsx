import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion'
import {Scene} from '~/types/scene'

export default function Video({scenes}: {scenes: Scene[]}) {
	const {fps} = useVideoConfig()

	// const transitionStart = 2 * fps
	// const transitionDuration = 1 * fps

	return (
		<AbsoluteFill>
			{scenes.map(({title}, i) => (
				<Sequence
					key={i}
					from={i * fps}
					durationInFrames={fps}>
					<div className='absolute flex h-full w-full items-center justify-center bg-black'>
						<code className='text-xs text-white'>{title}</code>
					</div>
				</Sequence>
			))}
		</AbsoluteFill>
	)
}
