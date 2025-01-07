import {Flame, Star} from 'lucide-react'
import {Week} from '../types/github'
import {findLongestStreak, findMostActiveTimes} from '../utils/records'

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
	const maxDate = formatDate(new Date(2023, 0, maxDayIndex).toDateString())

	return {max, maxDate}
}

const COLORS = [
	'bg-[#141414]',
	'bg-[#303030]',
	'bg-[#505050]',
	'bg-[#707070]',
	'bg-[#909090]',
	'bg-[#B0B0B0]'
]

const MAX_COLOR = 'bg-yellow-500' // max value

export const getContributionData = stats => {
	const weeks = stats.contributionsHistory

	if (!weeks || !weeks.length)
		return {
			weeks: Array.from({length: 52}).fill({contributionDays: []})
		}

	const contributions = []
	const records = findMostActiveTimes(weeks)

	// RECORDS
	if (stats.stars?.received)
		records.push({
			title: 'Stars',
			value: stats.stars.received,
			subtitle: 'Earned',
			icon: <Star className='w-[16px] text-yellow-500' />
		})

	const longestStreak = findLongestStreak(weeks)
	if (longestStreak > 2)
		records.push({
			title: 'Longest Streak',
			value: longestStreak.toString(),
			subtitle: 'Days',
			icon: <Flame className='w-[16px] text-red-500' />
		})

	weeks.forEach(w =>
		w.contributionDays.forEach(d => {
			contributions.push(d.contributionCount)
		})
	)

	const {max, maxDate} = getMaxDate(contributions)

	const m = 1 / (COLORS.length - 1)
	const arr = weeks.slice()
	// TODO: evenly distribute colors
	arr.forEach(w =>
		w.contributionDays.forEach(d => {
			const val = d.contributionCount
			let color
			if (val === max) color = MAX_COLOR
			else {
				const normalized = d.contributionCount / max

				const index = Math.ceil(normalized / m)

				color = COLORS[index]
			}

			d.color = color
		})
	)

	return {
		weeks: arr,
		max,
		maxDate,
		records
	}
}

/**
 * Graph of user contributions since Jan 1
 */
export default function ContributionGraph({
	weeks,
	progress
}: {
	weeks: Week[]
	progress: number
}) {
	return (
		<div className='flex w-full flex-wrap justify-center'>
			{weeks.map((week, i) => (
				<div
					key={i}
					style={{
						opacity: progress >= i / weeks.length ? 1 : 0,
						transition: 'opacity 0.5s ease-in-out'
					}}
					className='mr-0.5 flex flex-col'>
					{/* Each day is now a row in the week's column */}
					{week.contributionDays.map((day, j) => (
						<div
							key={j}
							className={`mb-[2px] h-4 w-4 rounded-[4px] ${day.color}`}
						/>
					))}
				</div>
			))}
		</div>
	)
}
