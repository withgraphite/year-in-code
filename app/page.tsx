import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Hero from '~/components/Hero'
import {DEFAULT_META} from '~/constants/metadata'
import {Database} from '~/types/supabase'

export const dynamic = 'force-dynamic'

export const metadata = {
	...DEFAULT_META
}

export default async function Page() {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (session) redirect(`/loading`)


	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-10 p-5'>
			 <Hero />
		</div>
	)
}
