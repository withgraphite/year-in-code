import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import Auth from 'lib/components/Auth'
import {ArrowUpRight} from 'lucide-react'
import {cookies} from 'next/headers'
import Link from 'next/link'
import {redirect} from 'next/navigation'
import LeaderBoard from '~/components/LeaderBoard'
import {Database} from '~/types/supabase'

export const dynamic = 'force-dynamic'

export default async function Page() {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (session && session.provider_token) redirect(`/loading`)

	return (
		<div>
			<div className='flex min-h-screen w-full flex-col items-center justify-center gap-10 p-5 sm:p-20'>
				<div className='flex h-[80vw] w-[80vw] flex-col items-center justify-center gap-5 rounded-full bg-gradient-to-br from-[#5BDCF9]  via-[#2E73FC] to-[#000AFF] p-2 text-center transition-all duration-300 sm:h-[50vw] sm:w-[50vw] sm:p-10 lg:p-24'>
					{/* from-[#FFE86D] via-[#FF7437] to-[#CC0000] */}
					<h1 className='text-stone-50'>Year in Code</h1>
					<p className='text-stone-100 sm:text-xl'>
						Generate a personalized AI-powered video to end 2023.
					</p>
					<Auth session={session} />
				</div>
				<h3 className='flex gap-1'>
					<span className='text-stone-400'>by</span>
					<Link
						href='https://graphite.dev'
						className='group flex items-center text-stone-800 no-underline'>
						Graphite.dev
						<ArrowUpRight className='transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
					</Link>
				</h3>
			</div>
			<LeaderBoard />
		</div>
	)
}
