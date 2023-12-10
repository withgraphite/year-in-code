import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Hero from '~/components/Hero'
import Year from '~/components/Year'
import {Database} from '~/types/supabase'

export const dynamic = 'force-dynamic'

export const metadata = {
	title: 'Year in Code | Graphite',
	description: 'End 2023 with a video for your GitHub stats.'
}

export default async function Page() {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (session) redirect(`/generate`)
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-10 p-5'>
			<Year />
			<Hero session={session} />
		</div>
	)
}
