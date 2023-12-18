import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import Space from '../environment/Space'

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
	return {
		from,
		background: <Space tick={frame} />,
		camera: (
			<Camera
				position={[0, 0, 400]}
				fov={50}
			/>
		),
		content: (
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
		)
	}
}
