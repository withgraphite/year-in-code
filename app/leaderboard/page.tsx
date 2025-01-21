import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {Leaderboard} from '~/components/Leaderboard'
import {DEFAULT_META, META} from '~/constants/metadata'

export const dynamic = 'force-dynamic'

export const metadata = {
	...DEFAULT_META,
	title: 'Leaderboard | ' + META.title,
	description: 'See who opened the most pull requests. ' + META.desc,
	openGraph: {
		title: 'Leaderboard | ' + META.title,
		description: 'See who opened the most pull requests. ' + META.desc
	},
	twitter: {
		title: 'Leaderboard | ' + META.title,
		description: 'See who opened the most pull requests. ' + META.desc
	}
}

export default async function LeaderboardPage() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	const {data, error} = await supabase
		.from('leaderboard')
		.select('*')
		.order('pull_requests_opened', {ascending: false})
	if (error) console.error(error.message)

	return (
		<Leaderboard
			data={data}
			session={session}
		/>
	)
}
