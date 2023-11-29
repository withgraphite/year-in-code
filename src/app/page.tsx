import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Auth from '~/components/Auth'

export const dynamic = 'force-dynamic'

export default async function Page() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	if (session) redirect('/dashboard')
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-10 p-5 sm:p-20'>
			<h1>Landing page</h1>
			<Auth session={session} />
		</div>
	)
}
