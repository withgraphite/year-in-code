import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import Auth from 'lib/components/Auth'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Graphite from '~/components/Graphite'
import {Database} from '~/types/supabase'

export const dynamic = 'force-dynamic'

export default async function Page() {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (session && session.provider_token) redirect(`/loading`)
	return (
		<div className='relative flex h-screen w-full flex-col items-center justify-center gap-10 p-5 sm:p-20'>
			{/* <div className='absolute z-[-2]'>
				<p className='text-[650px] text-stone-200'>2023</p>
			</div> */}
			<div className='flex h-[80vw] w-[80vw] flex-col items-center justify-center gap-5 rounded-full bg-gradient-to-br from-[#5BDCF9] via-[#2E73FC] to-[#000AFF] p-2 text-center transition-all duration-300 sm:h-[60vw] sm:w-[60vw] sm:p-10 md:h-[50vw] md:w-[50vw] lg:p-24 xl:h-[35vw] xl:w-[35vw] 2xl:h-[20vw] 2xl:w-[20vw]'>
				<h1 className='text-stone-50'>Year in Code</h1>
				<p className='text-stone-100 sm:text-xl'>
					Generate a personalized AI-powered video to end 2023.
				</p>
				<Auth session={session} />
			</div>
			<h3 className='absolute bottom-5 flex gap-1 text-stone-200'>
				<span className='text-stone-400 dark:text-stone-600'>by</span>
				<Graphite />
			</h3>
		</div>
	)
}
