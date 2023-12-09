import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Player from '~/components/Player'
import Toolbar from '~/components/Toolbar'
import {Stats} from '~/types/github'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import {default as getProfile} from '~/utils/profile'

export const dynamic = 'force-dynamic'

export default async function Profile({params}: {params: {username: string}}) {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	const profile = await getProfile(params.username)

	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			{/* User exists */}
			{profile && (
				<div
					id='videoContainer'
					className='flex w-full max-w-3xl flex-col justify-center gap-5 sm:items-center'>
					<div className='flex w-full flex-col justify-between gap-5 sm:flex-row sm:gap-0'>
						<h1 className='text-black dark:text-white'>{`${params.username}`}</h1>
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
						Oops!{' '}
						<span className='italic text-black dark:text-white'>
							{params.username}
						</span>{' '}
						does not exist in our database.
					</h2>
					<Toolbar session={session} />
				</div>
			)}
		</div>
	)
}
