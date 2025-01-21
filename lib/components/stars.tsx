import {Stats} from '../types/github'

function Stars({stats}: {stats: Stats}) {
	if (!stats || !stats.stars) return <></>

	return (
		<div className='group relative p-5 text-left text-white'>
			<h1 className='label mb-2'>Stars</h1>
			<div>
				<div className='flex items-center space-x-2'>
					<p className='font-mono'>{stats.stars.given.toString()}</p>
					<p className='text-gray-400'>given</p>
				</div>
				<div className='flex items-center space-x-2'>
					<p className='font-mono'>{stats.stars.received.toString()}</p>
					<p className='text-gray-400'>earned</p>
				</div>
			</div>
		</div>
	)
}

export default Stars
