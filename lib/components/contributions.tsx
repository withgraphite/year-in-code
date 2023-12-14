import {Stats} from '../types/github'

// Format a date as Mmm dd, yyyy
const formatDate = (date: string): string => {
	let dateString = new Date(date).toDateString()
	let parts = dateString.split(' ').slice(1, 3)

	// If date starts with 0 drop it eg. Jan 4 -> Jan 4
	if (parts[1] && parts[1][0] == '0') parts[1] = parts[1][1]

	let formattedDate = parts.join(' ')
	return formattedDate
}

// Calculate and format date of most contributions
const getMaxDate = (contributions: number[]) => {
	const max = Math.max(...contributions)
	const maxDayIndex = contributions.findIndex(x => x == max)
	const maxDate = formatDate(new Date(2022, 0, maxDayIndex).toDateString())
	const maxDatePosition =
		maxDayIndex > 240 ? 'left-2/3' : maxDayIndex > 120 ? 'left-1/3' : 'left-0'

	return {max, maxDate, maxDatePosition}
}

/**
 * Graph of user contributions since Jan 1
 */
function Contributions({stats}: {stats: Stats}) {
	if (!stats || !stats.contributionsHistory) return <></>

	let contributions = []
	let colors = {}

	// Creating local variable to simplify calling in .map()
	const weeks = stats.contributionsHistory

	// Get array of contribution counts
	weeks.map(week => {
		week.contributionDays.map(day => contributions.push(day.contributionCount))
	})

	// Get max contribution value and its date
	const {max, maxDate} = getMaxDate(contributions)

	// Get array of unique contribution values (ascending)
	const unique = contributions.filter((x, i, a) => a.indexOf(x) === i).sort()

	// Divide each value with max and round to nearest quarter
	unique.map(value => {
		let normalized = value / max
		let rounded = Math.ceil(normalized / 0.25) * 0.25

		// Assign color for each case
		if (value === max) colors[value] = 'bg-yellow-400/90'
		else if (rounded === 0) colors[value] = 'bg-gray-200/20'
		else if (rounded === 0.25) colors[value] = 'bg-green-800/90'
		else if (rounded === 0.5) colors[value] = 'bg-green-600/90'
		else if (rounded === 0.75) colors[value] = 'bg-green-400/90'
		else if (rounded === 1) colors[value] = 'bg-green-300/90'
	})

	return (
		<div className='group relative flex max-w-6xl flex-col items-start p-5'>
			<div className='flex w-full flex-col items-baseline text-gray-400 sm:flex-row sm:justify-between'>
				<h1 className='mb-2 whitespace-nowrap text-left text-xl font-medium text-gray-200'>
					Contributions
				</h1>
				<div className='mb-4 space-x-1 sm:mb-0'>
					{maxDate && max > 10 && (
						<span>
							Top day: {max} on {maxDate}
						</span>
					)}
				</div>
			</div>
			<div className='flex w-full flex-wrap'>
				{weeks.map((week, i) => (
					<div
						key={i}
						className='mr-1 flex flex-col'>
						{/* Each day is now a row in the week's column */}
						{week.contributionDays.map((day, j) => (
							<div
								key={j}
								className={`mb-0.5 h-4 w-4 ${colors[day.contributionCount]}`}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Contributions
