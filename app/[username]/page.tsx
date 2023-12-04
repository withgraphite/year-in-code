import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Auth from '~/components/Auth'
import Player from '~/components/Player'
import {Database} from '~/types/supabase'
import profileUser from '~/utils/profile'

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

	// Generate video
	const video = await profileUser(session)

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
