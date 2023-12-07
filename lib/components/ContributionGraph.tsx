import {Week} from '~/types/github'

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
export default function ContributionGraph({weeks}: {weeks: Week[]}) {
	let contributions = []
	let colors = {}

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
		<div className='group relative mb-3 flex max-w-4xl flex-col items-start p-5'>
			<div className='flex w-full flex-col items-baseline text-gray-400 sm:flex-row sm:justify-between'>
				<div className='mb-4 space-x-1 sm:mb-0'>
					{maxDate && max > 10 && (
						<span>
							Top day: {max} on {maxDate}
						</span>
					)}
				</div>
			</div>
			<div className='grid grid-flow-row grid-cols-12 gap-0.5'>
				{/* Placeholders to account for the year starting on a Friday */}
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className='h-3 w-3 bg-gray-200/20'
					/>
				))}
				{/* Weeks */}
				{weeks.map(week =>
					week.contributionDays.map((day, j) => (
						<div
							key={j}
							className={`h-3 w-3 ${colors[day.contributionCount]}`}
						/>
					))
				)}
			</div>
		</div>
	)
}
