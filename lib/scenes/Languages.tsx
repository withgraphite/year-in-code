import {useCurrentFrame} from 'remotion'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import Space from '../environment/Space'
import Sequence from '../video/Sequence'

export default function Languages({
	text,
	from,
	languages
}: {
	text: string
	from: number
	languages: string[]
}) {
	const frame = useCurrentFrame() - from

	return (
		<Sequence
			from={from}
			transitionIn='fade'
			transitionOut='warp'
			background={
				<Canvas
					frame={frame}
					camera={
						<Camera
							position={[0, 0, 400]}
							fov={50}
						/>
					}>
					<Space tick={frame} />
				</Canvas>
			}
			content={
				<>
					<h2>{text}</h2>
					<div className='flex gap-5'>
						{languages.map((language, i) => (
							<div
								style={{opacity: frame > i * 30 ? frame / 30 - i : 0}}
								className={`text-5xl devicon-${language.toLowerCase()}-plain colored`}
								key={language}
							/>
						))}
					</div>
				</>
			}
		/>
	)
}
