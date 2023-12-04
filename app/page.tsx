import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import Auth from 'lib/components/Auth'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (session && session.provider_token)
		redirect(`/${session.user.user_metadata.user_name}`)

	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-10 p-5 sm:p-20'>
			<h1>Landing page</h1>
			<Auth session={session} />
		</div>
	)
}
