import {useCurrentFrame} from 'remotion'

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
		background: undefined,
		camera: undefined,
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
