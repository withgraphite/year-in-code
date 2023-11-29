import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Auth from '~/components/Auth'
import {getUserStats} from '~/utils/stats'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	if (!session) redirect('/')

	const githubStats = await getUserStats(session.provider_token)

	console.log(githubStats)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<h1>Dashboard</h1>
			<p>
				Welcome <b>{session.user.user_metadata.user_name}</b>, you are
				authenticated.
			</p>
			<Auth session={session} />
			{JSON.stringify(githubStats)}
		</div>
	)
}
