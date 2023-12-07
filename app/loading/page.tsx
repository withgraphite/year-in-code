import {
	Session,
	createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {Suspense} from 'react'
import LoadingComponent from '~/components/Loading'
import {Stats} from '~/types/github'
import {Database} from '~/types/supabase'
import generateScenes from '~/utils/generate'
import getProfile from '~/utils/profile'
import {getStats} from '~/utils/stats'

export const maxDuration = 300

export const dynamic = 'force-dynamic'

async function VideoRender({stats, session}: {stats: Stats; session: Session}) {
	const scenes = await generateScenes(stats, session)
	if (scenes) redirect(`/${session.user.user_metadata.user_name}`)
	return <div></div>
}

export default async function Loading() {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (!session) redirect('/')

	// GitHub provider_token is null if a user revisits the page after the token has expired
	// Supabase does not plan on adding support for this anytime soon
	// Improvement: https://github.com/supabase/gotrue-js/issues/806 manually make request to GitHub
	// API and reset the provider token
	if (session.provider_token === null) {
		await supabase.auth.signOut()
		redirect('/')
	}

	const profile = await getProfile(session.user.user_metadata.user_name)
	if (
		profile &&
		profile.github_stats !== null &&
		profile.video_manifest !== null
	)
		redirect(`/${session.user.user_metadata.user_name}`)

	const stats = await getStats(session.provider_token)
	// video(stats, session)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<LoadingComponent stats={stats} />
			<Suspense>
				<VideoRender
					stats={stats}
					session={session}
				/>
			</Suspense>
		</div>
	)
}
