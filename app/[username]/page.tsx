import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Player from '~/components/Player'
import Toolbar from '~/components/Toolbar'
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
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<Player video={profile.video_manifest as Manifest} />
			<Toolbar session={session} />
		</div>
	)
}
