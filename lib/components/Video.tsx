import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion'
import {Scenes} from '~/types/scene'

export default function Video({scenes}: {scenes: Scenes}) {
	const {fps} = useVideoConfig()

	return (
		<AbsoluteFill>
			{scenes.scenes.map(({text, animation}, i) => (
				<Sequence
					key={i}
					from={i * fps * 3}
					durationInFrames={fps * 3}>
					<div className='absolute flex h-full w-full items-center justify-center bg-black'>
						<code className='text-xs text-white'>{text}</code>
					</div>
				</Sequence>
			))}
		</AbsoluteFill>
	)
}
