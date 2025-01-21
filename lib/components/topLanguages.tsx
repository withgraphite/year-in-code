import {Stats} from '../types/github'
import {getLanguage} from '../utils/language'

/**
 * Render the user's top coding languages
 */
function TopLanguages({stats}: {stats: Stats}) {
	const languages = stats.topLanguages

	if (!languages) return <></>

	return (
		<div className='group relative flex flex-col text-left'>
			<h1 className='label mb-2'>Top Languages</h1>
			<div className='flex flex-col gap-y-1 text-sm text-white'>
				{languages.map((language, i) => (
					<div
						key={i}
						className='flex items-center gap-x-4'>
						<div className='w-[8px] text-center font-mono text-gray-600'>{i + 1}</div>
						<div
							className={`devicon-${getLanguage(
								language.name
							)}-plain text-md relative text-gray-300`}>
							<div
								className={`devicon-${getLanguage(
									language.name
								)}-plain text-md absolute left-0 top-0 h-full w-full text-current blur-[1px]`}
							/>
						</div>
						<p className='font-mono text-gray-300'>{language.commonName}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default TopLanguages
