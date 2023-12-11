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
		<div className='flex items-end justify-center space-x-4 p-4'>
			{monthlyContributions.map((value, index) => (
				<div
					key={index}
					className='flex flex-col items-center'>
					<div className='flex flex-col'>
						<div
							className='text-white'
							style={{visibility: frame / 10 - index > 0 ? 'visible' : 'hidden'}}>
							{value}
						</div>
						<div
							style={{
								width: '30px',
								// height: `${(value / maxValue) * 200}px`,
								// height should rise from min to max over 10 frames each delayed to be one at a time
								height: `${Math.min(value / maxValue, frame / 10 - index) * 200}px`,
								minHeight: '10px', // Ensure that even 0 values are visible,
								backgroundColor: color
							}}
						/>
					</div>
					<span className='mt-2 text-xs text-white'>
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
								'Dev'
							][index]
						}
					</span>{' '}
					{/* Month labels */}
				</div>
			))}
		</div>
	)
}
