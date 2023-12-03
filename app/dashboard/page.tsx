import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import Auth from 'lib/components/Auth'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Player from '~/components/Player'
import {Scene} from '~/types/scene'
import generateScenes from '~/utils/scenes'
import {getUserStats} from '~/utils/stats'
import generateStory from '~/utils/story'

export default async function Dashboard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (!session) redirect('/')

	// GitHub provider_token is null if a user revisits the page after the token has expired
	// Supabase does not plan on adding support for this anytime soon
	// Improvement: https://github.com/supabase/gotrue-js/issues/806 manually make request to GitHub
	// API and reset the provider token
	if (session.provider_token === null)
		return (
			<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
				<h1>Dashboard</h1>
				<p>
					Welcome <b>{session.user.user_metadata.user_name}</b>, you are
					authenticated.
				</p>
				<Auth session={session} />
			</div>
		)

	// Fetch GitHub stats, create story from stats & video scenes from story
	const stats = await getUserStats(session.provider_token)
	const story = await generateStory(stats)
	const {scenes} = (await generateScenes(story)) as {scenes: Scene[]}

	console.log(scenes)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<Player scenes={scenes} />
		</div>
	)
}
