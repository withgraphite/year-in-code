import {useCurrentFrame} from 'remotion'
import {getLanguage} from '../utils/language'

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

	if (frame < 0) 
		return null
	

	return {
		from,
		background: undefined,
		camera: undefined,
		content: (
			<>
				<h2 className='headline'>{text}</h2>
				<div className='inset-shadow flex gap-6 rounded-xl border border-white/20 p-6 text-[#313131]'>
					{languages.map((language, i) => {
						return (
							<div
								style={{opacity: frame > i * 30 ? frame / 30 - i : 0}}
								className={`text-6xl devicon-${getLanguage(
									language
								)}-plain relative text-white`}
								key={language}>
								<div
									className={`text-6xl devicon-${getLanguage(
										language
									)}-plain absolute left-0 top-0 h-full w-full text-white blur-[3px]`}
								/>
							</div>
						)
					})}
				</div>
			</>
		)
	}
}
