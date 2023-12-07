import {
	AbsoluteFill,
	Audio,
	Sequence,
	staticFile,
	useVideoConfig
} from 'remotion'
import Conclusion from '~/scenes/Conclusion'
import Contributions from '~/scenes/Contributions'
import Flashback from '~/scenes/Flashback'
import Intro from '~/scenes/Intro'
import Languages from '~/scenes/Languages'
import People from '~/scenes/People'
import Stars from '~/scenes/Stars'
import {Stats} from '~/types/github'
import {Manifest} from '~/types/video'

export default function Video({video, stats}: {video: Manifest; stats: Stats}) {
	const {fps} = useVideoConfig()

	return (
		<AbsoluteFill className='font-mono'>
			<Audio src={staticFile('/music/Autohacker.mp3')} />
			{video.scenes.map(({text, animation}, i) => {
				switch (animation?.type) {
					case 'intro':
						return (
							<Intro
								key={i}
								from={i * fps * 5}
								name={animation.name}
							/>
						)
					case 'flashback':
						return (
							<Flashback
								key={i}
								from={i * fps * 5}
								dateFrom={animation.dateFrom}
								dateTo={animation.dateTo}
								text={text}
							/>
						)
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
					case 'people':
						return (
							<People
								key={i}
								from={i * fps * 5}
								text={text}
								people={animation.people}
							/>
						)
					case 'contributions':
						return (
							<Contributions
								key={i}
								from={i * fps * 5}
								text={text}
								weeks={stats.contributionsHistory}
							/>
						)
					case 'conclusion':
						return (
							<Conclusion
								key={i}
								from={i * fps * 5}
								text={text}
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
