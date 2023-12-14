import {Stats} from '../types/github'

/**
 * Fetch and display the user's top highlights
 * @returns {element} div with text
 */
export default function Highlights({stats}: {stats: Stats}) {
	// Size the text according to the number
	const numberToFontSize = (count: number): string => {
		let order = Math.floor(Math.log(count))

		// Medium to 9xl (maximum in Tailwind)
		if (!order || order === 0) return 'text-lg'
		else if (order <= 2) return 'text-xl'
		else if (order <= 3) return 'text-2xl'
		else if (order <= 4) return 'text-3xl'
		else if (order <= 5) return 'text-4xl'
		else if (order <= 6) return 'text-5xl'
		else return 'text-7xl'
	}

	// Stats to render
	let stat = [
		{
			count: stats.commits,
			fontSize: 'text-lg',
			tagline: 'You have no commitment issues',
			title: 'Total commits',
			colour: 'text-blue-600'
		},
		{
			count: stats.contributions,
			fontSize: 'text-lg',
			tagline: 'You put in the work',
			title: 'Total contributions',
			colour: 'text-yellow-600'
		},
		{
			count: stats.repos,
			fontSize: 'text-lg',
			tagline: 'You code far and wide',
			title: 'Repositories',
			colour: 'text-orange-600'
		},
		{
			count: stats.pulls,
			fontSize: 'text-lg',
			tagline: 'You pull your own weight',
			title: 'Pull requests',
			colour: 'text-indigo-600'
		},
		{
			count: stats.reviews,
			fontSize: 'text-lg',
			tagline: "You're a good friend",
			title: 'Pull reviews',
			colour: 'text-green-600'
		}
	]

	// Get font size for each stat
	stat.map(stat => (stat.fontSize = numberToFontSize(stat.count)))

	return (
		<div className='group relative p-5 text-left'>
			<h1 className='mb-2 text-xl font-medium text-gray-200'>Overview</h1>

			<div className='grid grid-cols-3 items-end gap-5 text-white'>
				{stat.map(
					stat =>
						stat.count > 0 && (
							<div key={stat.title}>
								<p className={`${stat.fontSize} ${stat.colour} font-mono`}>
									{stat.count}
								</p>
								<p className='leading-none text-gray-400'>{stat.title}</p>
							</div>
						)
				)}
			</div>
		</div>
	)
}
