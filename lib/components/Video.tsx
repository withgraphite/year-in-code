import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion'
import Languages from '~/scenes/Languages'
import Stars from '~/scenes/Stars'
import {Manifest} from '~/types/video'

export default function Video({video}: {video: Manifest}) {
	const {fps} = useVideoConfig()

	return (
		<AbsoluteFill>
			{video.scenes.map(({text, animation}, i) => {
				switch (animation?.type) {
					case 'stars':
						return (
							<Stars
								key={i}
								text={text}
								stars={animation.numStars}
							/>
						)
					case 'languages':
						return (
							<Languages
								key={i}
								text={text}
								languages={animation.languages}
							/>
						)
					default:
						return (
							<Sequence
								key={i}
								from={i * fps * 5}
								durationInFrames={fps * 5}>
								<div className='absolute flex h-full w-full items-center justify-center bg-black'>
									<code className='text-xs text-white'>{text}</code>
								</div>
							</Sequence>
						)
				}
			})}
		</AbsoluteFill>
	)
}
