import {Stats} from '~/types/github'
import BlockChart from './blockChart'

/**
 * Display the user's top repositories
 * @returns {element} div with text
 */
function TopRepos({stats}: {stats: Stats}) {
	if (!stats || !stats.topRepos) return <></>

	// Formatting data in chart-friendly format
	const chartData = {
		names: stats.topRepos.map(repo => repo.name),
		namesWithOwner: stats.topRepos.map(repo => repo.nameWithOwner),
		isPrivate: stats.topRepos.map(repo => repo.isPrivate),
		url: stats.topRepos.map(repo => repo.url),
		avatarUrl: stats.topRepos.map(repo => repo.avatarUrl),
		stars: stats.topRepos.map(repo => repo.stars),
		values: stats.topRepos.map(repo => repo.contributions),
		colors: ['bg-orange-600/80', 'bg-green-600/80', 'bg-purple-600/80']
	}

	return (
		<div className='group relative p-5 text-left text-white'>
			<h1 className='mb-2 text-xl font-medium text-gray-200'>Repos</h1>
			<BlockChart chartData={chartData} />
		</div>
	)
}

export default TopRepos
