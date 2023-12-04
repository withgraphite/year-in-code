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
								from={i * fps * 5}
								text={text}
								stars={animation.numStars}
							/>
						)
					case 'languages':
						return (
							<Languages
								key={i}
								from={i * fps * 5}
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
									<h2 className='mx-48 text-center text-white'>{text}</h2>
								</div>
							</Sequence>
						)
				}
			})}
		</AbsoluteFill>
	)
}
