import {StarIcon} from 'lucide-react'
import Image from 'next/image'

// Repo name with dimmed owner name
const StyledRepoName = (nameWithOwner: string) => {
	return (
		<p>
			<span className='text-gray-400'>{nameWithOwner.split('/')[0]}/</span>
			<span className='font-medium text-white'>{nameWithOwner.split('/')[1]}</span>
		</p>
	)
}

// Block chart component
const BlockChart = ({chartData}) => {
	// Generating values for bar height
	let heights = Array(10).fill('h-[60px]')
	// const max = Math.max(...chartData.values)
	// chartData.values.map((value, i) => {
	// 	let normalValue = value / max

	// 	// Rounding to the nearest 0.1
	// 	let rounded = Math.round(normalValue * 10) / 10

	// 	// Manually assigning bar heights because Tailwind doesn't allow
	// 	// dynamic classes
	// 	if (rounded == 0) heights[i] = 'h-[50px]'
	// 	else if (rounded == 0.1) heights[i] = 'h-[30px]'
	// 	else if (rounded == 0.2) heights[i] = 'h-[40px]'
	// 	else if (rounded == 0.3) heights[i] = 'h-[50px]'
	// 	else if (rounded == 0.4) heights[i] = 'h-[60px]'
	// 	else if (rounded == 0.5) heights[i] = 'h-[70px]'
	// 	else if (rounded == 0.6) heights[i] = 'h-[80px]'
	// 	else if (rounded == 0.7) heights[i] = 'h-[90px]'
	// 	else if (rounded == 0.8) heights[i] = 'h-[100px]'
	// 	else if (rounded == 0.9) heights[i] = 'h-[110px]'
	// 	else if (rounded == 1) heights[i] = 'h-[120px]'
	// })

	return (
		<div className='grid grid-cols-3 items-baseline'>
			{chartData.values.map((value, i) => (
				<div
					key={i}
					className='flex flex-col text-center text-white'>
					<div className='w-[160px]'>
						{value > 10 && (
							<div
								className={`${chartData.colors[i]} w-full ${heights[i]} group flex flex-col justify-between p-2 text-left text-sm text-gray-200 transition-transform`}>
								<div>
									<p className='pr-0.5 font-mono text-3xl leading-none'>{value}</p>
									<p className='leading-none'>commits</p>
								</div>
							</div>
						)}
					</div>
					<div className='mt-2 flex flex-row items-center text-sm font-medium text-gray-200'>
						{chartData.avatarUrl[i] && (
							<Image
								className='mr-1 h-7 w-7 rounded-full'
								src={chartData.avatarUrl[i]}
								alt={chartData.names[i] + ' logo'}
								width={28}
								height={28}
							/>
						)}
						<a
							className='text-[10px]'
							href={chartData.url[i]}>
							{chartData.names[i].substring(0, 20)}
						</a>
						{chartData.stars[i] > 3 && (
							<span className='ml-1.5 flex items-center space-x-0.5 text-yellow-400'>
								<StarIcon className='mt-0.5' />
								<span>{chartData.stars[i]}</span>
							</span>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default BlockChart
