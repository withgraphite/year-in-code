import {Stats} from '../types/github'

function Stars({stats}: {stats: Stats}) {
	if (!stats || !stats.stars) return <></>

	return (
		<div className='group relative p-5 text-left text-white'>
			<h1 className='mb-2 text-xl font-medium text-gray-200'>Stars</h1>
			<div>
				<div className='flex items-center space-x-2'>
					<p className='font-mono text-3xl text-green-600'>
						+{stats.stars.given.toString()}
					</p>
					<p className='text-xl text-gray-400'>starred</p>
				</div>
				<div className='flex items-center space-x-2'>
					<p className='font-mono text-3xl text-orange-600'>
						+{stats.stars.received.toString()}
					</p>
					<p className='text-xl text-gray-400'>stars</p>
				</div>
			</div>
		</div>
	)
}

export default Stars
