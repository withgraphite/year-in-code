import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Auth from '~/components/Auth'

export default async function Page() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-10 p-5 sm:p-20'>
			<p>Graphite x Rubric</p>
			{session && (
				<p>
					Welcome <b>{session.user.user_metadata.user_name}</b>, you are
					authenticated.
				</p>
			)}
			<Auth session={session} />
		</div>
	)
}
