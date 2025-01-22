import {Week} from '~/types/github'

export default function MonthsChart({
	contributions,
	frame,
	color
}: {
	contributions: Week[]
	frame: number
	color: string
}) {
	let monthlyContributions = new Array(12).fill(0)

	contributions.forEach(week => {
		week.contributionDays.forEach(day => {
			// Extract the month from the date
			let month = new Date(day.date).getMonth()
			// Sum the contributions for the month
			monthlyContributions[month] += day.contributionCount
		})
	})

	const maxValue = Math.max(...monthlyContributions)

	return (
		<div className='flex items-end justify-center space-x-4 p-4 font-mono text-sm '>
			{monthlyContributions.map((value, index) => (
				<div
					key={index}
					className='flex flex-col items-center'>
					<div className='flex flex-col'>
						<div
							className='mb-1 text-white'
							style={{visibility: frame / 10 - index > 0 ? 'visible' : 'hidden'}}>
							{value}
						</div>
						<div
							style={{
								width: '40px',
								height: `${Math.min(value / maxValue, frame / 10 - index) * 200}px`,
								minHeight: '10px' // Ensure that even 0 values are visible,
								// backgroundColor: color
							}}
							className='inset-shadow border border-neutral-700 bg-neutral-700 text-white/50'
						/>
					</div>
					<span className='mt-2 font-bold uppercase text-white'>
						{
							[
								'Jan',
								'Feb',
								'Mar',
								'Apr',
								'May',
								'Jun',
								'Jul',
								'Aug',
								'Sep',
								'Oct',
								'Nov',
								'Dec'
							][index]
						}
					</span>{' '}
					{/* Month labels */}
				</div>
			))}
		</div>
	)
}
