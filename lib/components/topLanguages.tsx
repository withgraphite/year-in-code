import {Stats} from '~/types/github'

/**
 * Render the user's top coding languages
 */
function TopLanguages({stats}: {stats: Stats}) {
	const languages = stats.topLanguages

	if (!languages) return <></>

	return (
		<div className='group relative p-5 text-left'>
			<h1 className='mb-3 text-xl font-medium text-gray-200'>Languages</h1>
			<div className='space-y-2 text-white'>
				{languages.map((language, i) => (
					<div
						key={i}
						className='flex items-center space-x-3'
						style={{color: language.color}}>
						<p
							className={`devicon-${language.name}-plain text-4xl transition-transform hover:scale-[1.5]`}
						/>
						<p className='font-mono text-xl'>{language.commonName}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default TopLanguages
