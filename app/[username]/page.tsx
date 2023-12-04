import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Auth from '~/components/Auth'
import Player from '~/components/Player'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import generateVideo from '~/utils/generate'
import {getUserStats} from '~/utils/stats'

export default async function Dashboard({
	params
}: {
	params: {username: string}
}) {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	let video: Manifest = {}

	if (!session) redirect('/')

	// GitHub provider_token is null if a user revisits the page after the token has expired
	// Supabase does not plan on adding support for this anytime soon
	// Improvement: https://github.com/supabase/gotrue-js/issues/806 manually make request to GitHub
	// API and reset the provider token
	if (session.provider_token === null) {
		await supabase.auth.signOut()
		redirect('/')
	}

	const {data, error} = await supabase.from('profile').select().single()
	if (error) console.error(error.message)

	// First time user
	if (!data) {
		// Fetch GitHub stats, create story from stats & video scenes from story
		const stats = await getUserStats(session.provider_token)
		console.log(stats)
		video = (await generateVideo(stats)) as Manifest

		// Store manifest in database
		const {error} = await supabase.from('profile').insert({video_manifest: video})
		if (error) console.error(error.message)
	} // Returning user
	else video = data.video_manifest as Manifest

	console.log(video.scenes)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<p>
				Hi {params.username}, welcome to your{' '}
				<span className='font-bold italic'>Year in Code 2023</span>.
			</p>
			<Player video={video} />
			<div className='flex items-center gap-5'>
				<button>Download</button>
				<Auth session={session} />
			</div>
		</div>
	)
}
