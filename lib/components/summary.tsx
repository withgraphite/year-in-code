import {Stats} from '../types/github'
import Contributions from './contributions'
import Follows from './follows'
import Highlights from './highlights'
import Stars from './stars'
import TopLanguages from './topLanguages'
import TopRepos from './topRepos'

/**
 * All slides in one view for easy sharing
 */
function Summary({stats}: {stats: Stats}) {
	return (
		<div className='relative flex flex-col items-center justify-center'>
			<div className='flex flex-row'>
				<div className='flex flex-col'>
					<Highlights stats={stats} />
					<TopRepos stats={stats} />
				</div>

				<div className='flex flex-col'>
					<TopLanguages stats={stats} />
					<Stars stats={stats} />
				</div>
				<Follows stats={stats} />
			</div>
			<div className='flex justify-start justify-center text-left'>
				<Contributions stats={stats} />
			</div>
		</div>
	)
}

export default Summary
