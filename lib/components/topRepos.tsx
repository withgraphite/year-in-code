import {FolderIcon} from 'lucide-react'
import {Stats} from '../types/github'

/**
 * Display the user's top repositories
 * @returns {element} div with text
 */
function TopRepos({stats}: {stats: Stats}) {
	if (!stats?.topRepos?.length) return null

	return (
		<div className='group relative flex flex-col text-left text-white'>
			<h1 className='label mb-2'>Top Repositories</h1>
			<div className='flex flex-col gap-1'>
				{stats.topRepos.map(({name, contributions}, i) => {
					return (
						<div
							className='flex items-center gap-2'
							key={i}>
							<FolderIcon className='h-auto w-[16px] text-gray-600' />
							<div
								className='ellipsis font-mono text-sm text-gray-300'
								style={{maxWidth: 150}}>
								{name}
							</div>
							<div className='rounded-full border border-gray-800 bg-[#0a0a0a] px-2 py-0.5 text-xs text-gray-400'>
								{contributions.toString()} commit{Number(contributions) > 0 ? 's' : ''}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default TopRepos
