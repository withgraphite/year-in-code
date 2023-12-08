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
		<div className='flex min-h-screen flex-col items-center justify-center gap-5 pt-20'>
			{/* User exists */}
			{profile && (
				<div className='flex max-w-3xl flex-col items-center justify-center gap-5 px-5'>
					<div className='flex w-full justify-between'>
						<h1 className='text-white'>{`${params.username}`}</h1>
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
				<div>
					<h2>Oops! User does not exist.</h2>
					<Toolbar session={session} />
				</div>
			)}
		</div>
	)
}
