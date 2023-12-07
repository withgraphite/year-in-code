import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Player from '~/components/Player'
import Toolbar from '~/components/Toolbar'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import {default as getProfile} from '~/utils/profile'

export default async function Profile({params}: {params: {username: string}}) {
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

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<Player video={profile.video_manifest as Manifest} />
			<Toolbar session={session} />
		</div>
	)
}
