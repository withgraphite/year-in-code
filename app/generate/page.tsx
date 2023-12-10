import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {Session} from '@supabase/supabase-js'
import {ArrowRight} from 'lucide-react'
import {cookies} from 'next/headers'
import Link from 'next/link'
import {redirect} from 'next/navigation'
import {Suspense} from 'react'
import Loading from '~/components/Loading'
import {Stats} from '~/types/github'
import {Database} from '~/types/supabase'
import generateScenes from '~/utils/generate'
import getProfile from '~/utils/profile'
import {getStats} from '~/utils/stats'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

async function Stats({stats}: {stats: Stats}) {
	return <Loading stats={stats} />
}

async function Video({session, stats}: {session: Session; stats: Stats}) {
	const scenes = await generateScenes(stats, session)
	return (
		<Link href={`/${session.user.user_metadata.user_name}`}>
			<button className='group w-fit text-lg lg:w-fit'>
				<span>See video</span>
				<ArrowRight className='h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
			</button>
		</Link>
	)
}

export default async function Generate() {
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

	// No profile, run through the generate page
	const stats = await getStats(session.provider_token)
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			<Suspense fallback={<h3>Loading...</h3>}>
				<Stats stats={stats} />
			</Suspense>
			<Suspense>
				<Video
					session={session}
					stats={stats}
				/>
			</Suspense>
		</div>
	)
}
