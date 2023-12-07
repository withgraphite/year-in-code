import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import LoadingComponent from '~/components/Loading'
import {Stats} from '~/types/github'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import generateScenes from '~/utils/generate'
import getProfile from '~/utils/profile'
import {getStats} from '~/utils/stats'

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

	const profile = await getProfile(session)
	if (profile.github_stats !== null && profile.video_manifest !== null)
		redirect(`/${session.user.user_metadata.user_name}`)

	const stats = profile
		? (profile.github_stats as unknown as Stats)
		: await getStats(session.provider_token)
	const scenes =
		!profile || profile.video_manifest === null
			? await generateScenes(stats, session)
			: (profile.video_manifest as Manifest)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<LoadingComponent stats={stats} />
		</div>
	)
}
