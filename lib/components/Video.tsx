import {
	AbsoluteFill,
	Audio,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig
} from 'remotion'
import Canvas from '../3d/Canvas'
import Space from '../environment/Space'
import AllStats from '../scenes/AllStats'
import Conclusion from '../scenes/Conclusion'
import Contributions from '../scenes/Contributions'
import Flashback from '../scenes/Flashback'
import Intro from '../scenes/Intro'
import Languages from '../scenes/Languages'
import Months from '../scenes/Months'
import People from '../scenes/People'
import Repos from '../scenes/Repos'
import Stars from '../scenes/Stars'
import Statistic from '../scenes/Statistic'
import FadeIn from '../transitions/FadeIn'
import {Stats} from '../types/github'
import {Manifest} from '../types/video'

export default function Video({video, stats}: {video: Manifest; stats: Stats}) {
	const {fps} = useVideoConfig()
	const frame = useCurrentFrame()

	const scenes = video.scenes.map(({text, animation}, i) => {
		switch (animation?.type) {
			case 'intro':
				return Intro({
					planet: video.planet || animation.planet,
					from: i * fps * 5,
					title: text
				})

			case 'flashback':
				return Flashback({
					from: i * fps * 5,
					dateFrom: animation.dateFrom,
					dateTo: animation.dateTo,
					text
				})
			case 'languages':
				return Languages({
					from: i * fps * 5,
					text,
					languages: animation.languages
				})
			case 'people':
				return People({
					from: i * fps * 5,
					text,
					people: animation.people
				})
			case 'contributions':
				return Contributions({
					from: i * fps * 5,
					text,
					weeks: stats.contributionsHistory
				})
			case 'repos':
				return Repos({
					from: i * fps * 5,
					text,
					repos: animation.repos.map(repo => ({
						name: repo.name,
						color: repo.color
					}))
				})

			case 'months':
				return Months({
					from: i * fps * 5,
					text,
					contributions: stats.contributionsHistory,
					color: animation.color
				})

			case 'number':
				return Statistic({
					from: i * fps * 5,
					text,
					number: animation.number
				})
			case 'allStats':
				return AllStats({
					from: i * fps * 5,
					text,
					stats
				})
			case 'conclusion':
				return Conclusion({
					from: i * fps * 5,
					text
				})
			default:
				return Stars({
					from: i * fps * 5,
					text
				})
		}
	})

	const sceneNum = Math.floor(frame / (fps * 5))

	const scene = scenes[sceneNum]

	return (
		<AbsoluteFill>
			<div className='absolute h-full w-full items-center justify-center bg-black font-bold' />
			<Audio
				src={staticFile(`/music/${video.song || 'BlackOutDays'}.mp3`)}
				placeholder={null}
			/>
			<Sequence>
				<Canvas
					key={sceneNum}
					frame={frame}
					camera={scene.camera}>
					<Space tick={frame} />
					{scene.background}
				</Canvas>
				<FadeIn
					frame={frame}
					delay={scene.from}>
					<div className='absolute z-10 h-full w-full text-white'>
						<div className='flex h-full w-full flex-col items-center justify-center gap-10 p-24 text-center'>
							{scene.content}
						</div>
					</div>
				</FadeIn>
			</Sequence>
		</AbsoluteFill>
	)
}
