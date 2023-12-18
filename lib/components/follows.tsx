import {Stats} from '../types/github'

const imageClass = 'w-7 h-7 rounded-full hover:scale-[1.5] transition-transform'

function Follows({stats}: {stats: Stats}) {
	if (!stats || !stats.topFollows) return <></>

	const followers = stats.topFollows.followers
	const following = stats.topFollows.following

	return (
		<div className='group relative p-5 text-left text-white'>
			<div className='text-gray-400'>
				<h1 className='mb-2 text-xl font-medium text-gray-200'>People</h1>
				<div className='flex items-center space-x-2'>
					<span className='font-mono text-3xl text-green-600'>
						{following.totalCount.toString()}
					</span>
					<span className='text-xl text-gray-400'>following</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span className='font-mono text-3xl text-orange-600'>
						{followers.totalCount.toString()}
					</span>
					<span className='text-xl text-gray-400'>followers</span>
				</div>
			</div>

			<div className='mt-7'>
				<h3 className='mb-2 font-medium text-gray-200'>New Friends</h3>
				<div className='space-y-2'>
					{following.latest.map((person, i) => (
						<div
							key={i}
							className='flex items-center space-x-2'>
							<div
								key={i}
								className='flex items-center space-x-2'>
								<img
									width={28}
									height={28}
									className={imageClass}
									src={person.avatarUrl}
									alt={person.login + ' logo'}
								/>
							</div>
							<a
								href={person.url}
								className='font-medium text-gray-400'
								rel='noopener noreferrer'>
								{person.name ? person.name : person.login}
							</a>
						</div>
					))}
				</div>
			</div>

			{/* <div className='mt-7'>
				<h3 className='mb-2 font-medium text-gray-200'>Followers</h3>
				<div className='space-y-3'>
					{followers.latest.map((person, i) => (
						<div
							key={i}
							className='flex items-center space-x-2'>
							<div
								key={i}
								className='flex items-center space-x-2'>
								<img
									width={28}
									height={28}
									className={imageClass}
									src={person.avatarUrl}
									alt={person.login + ' logo'}
								/>
							</div>
							<a
								href={person.url}
								className='font-medium text-gray-400'
								rel='noopener noreferrer'>
								{person.name ? person.name : person.login}
							</a>
						</div>
					))}
				</div>
			</div> */}
		</div>
	)
}

export default Follows
