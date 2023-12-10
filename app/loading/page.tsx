import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import GenerateVideo from '~/components/GenerateVideo'
import {Database} from '~/types/supabase'
import getProfile from '~/utils/profile'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export default async function Loading() {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	// No session, return to home
	if (!session) redirect('/')

	// Profile already generated, redirect to profile page
	const profile = await getProfile(session.user.user_metadata.user_name)
	if (profile && profile.github_stats && profile.video_manifest)
		redirect(`/${session.user.user_metadata.user_name}`)

	// GitHub provider_token is null if a user revisits the page after the token has expired
	// Sign out user and redirect back to home page. Reference: https://github.com/supabase/gotrue-js/issues/806
	if (session.provider_token === null) {
		await supabase.auth.signOut()
		redirect('/')
	}

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			<GenerateVideo session={session} />
		</div>
	)
}
