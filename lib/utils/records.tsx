import {Calendar, Clock} from 'lucide-react'
import {Week} from '../types/github'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTHS = [
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
]

export function findLongestStreak(contributionsHistory) {
	let currentStreak = 0
	let longestStreak = 0

	for (const week of contributionsHistory)
		for (const day of week.contributionDays)
			if (day.contributionCount > 0)
				// Increment current streak as we found a day with contributions
				currentStreak++
			else {
				// No contributions on this day, check if current streak is the longest
				if (currentStreak > longestStreak) longestStreak = currentStreak

				// Reset current streak
				currentStreak = 0
			}

	// Check at the end in case the longest streak is at the end of the array
	if (currentStreak > longestStreak) longestStreak = currentStreak

	return longestStreak
}

export const findMostActiveTimes = (weeks: Week[]) => {
	const dayOfWeekContributions = Array(7).fill(0) // [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
	const monthContributions = Array(12).fill(0) // [Jan, Feb, Mar, ...]
	const dayOfWeekTotals = Array(7).fill(0)

	weeks.forEach(w => {
		w.contributionDays.forEach(d => {
			const dayOfWeek = d.weekday as number
			const month = Number(d.date.split('-')[1]) - 1

			dayOfWeekContributions[dayOfWeek] += d.contributionCount

			if (d.contributionCount) dayOfWeekTotals[dayOfWeek]++

			monthContributions[month] += d.contributionCount
		})
	})

	// Find most active day
	const maxDayIndex = dayOfWeekContributions.indexOf(
		Math.max(...dayOfWeekContributions)
	)

	// Find most active month
	const maxMonthIndex = monthContributions.indexOf(
		Math.max(...monthContributions)
	)

	return [
		{
			title: 'Most Active Month',

			value: MONTHS[maxMonthIndex],
			subtitle: `${monthContributions[maxMonthIndex]} contributions`,

			icon: <Calendar className='w-[16px] text-blue-500' />
		},
		{
			title: 'Most Active Day',
			value: DAYS[maxDayIndex],
			subtitle: `${dayOfWeekContributions[maxDayIndex]} contributions`,
			icon: <Clock className='w-[16px] text-violet-500' />
		}
	]
}
