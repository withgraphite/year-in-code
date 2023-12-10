import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import GitHubButton from '~/components/GitHubButton'
import Player from '~/components/Player'
import Toolbar from '~/components/Toolbar'
import {Stats} from '~/types/github'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import generateScenes from '~/utils/generate'
import {default as getProfile} from '~/utils/profile'
import {getStats} from '~/utils/stats'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

export default async function Profile({params}: {params: {username: string}}) {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	let profile = await getProfile(params.username)

	if (session && (!profile || !profile.github_stats || !profile.video_manifest))
		if (session.provider_token === null) {
			// GitHub provider_token is null if a user revisits the page after the token has expired
			// Supabase does not plan on adding support for this anytime soon
			// Improvement: https://github.com/supabase/gotrue-js/issues/806 manually make request to GitHub
			// API and reset the provider token
			await supabase.auth.signOut()
			redirect('/')
		} else {
			const stats = await getStats(session.provider_token)
			const scenes = await generateScenes(stats, session)
			profile = await getProfile(params.username)
		}

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			{/* User exists */}
			{profile && (
				<div
					id='videoContainer'
					className='flex w-full max-w-3xl flex-col justify-center gap-5 sm:items-center'>
					<div className='flex w-full flex-col justify-between gap-5 sm:flex-row sm:gap-0'>
						<div className='flex items-center gap-3'>
							<h1 className='text-black'>{`${params.username}`}</h1>
							<GitHubButton
								username={params.username}
								className='h-10 w-10'
							/>
						</div>
						<Toolbar session={session} />
					</div>
					{profile && (
						<Player
							video={profile.video_manifest as Manifest}
							stats={profile.github_stats as unknown as Stats}
						/>
					)}
				</div>
			)}

			{/* User does not exist */}
			{!profile && (
				<div className='flex flex-col items-center justify-center gap-5'>
					<h2>
						Oops! <span className='italic text-black'>{params.username}</span> does
						not exist in our database.
					</h2>
					<Toolbar session={session} />
				</div>
			)}
		</div>
	)
}
