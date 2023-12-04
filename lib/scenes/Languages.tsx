import {Sequence} from 'remotion'

export default function Languages({
	text,
	languages
}: {
	text: string
	languages: string[]
}) {
	return (
		<Sequence durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full items-center justify-center bg-black'>
				<code className='text-xs text-white'>{text}</code>
				<div className='flex'>
					{languages.map(language => (
						<div key={language}>{language}</div>
					))}
				</div>
			</div>
		</Sequence>
	)
}
