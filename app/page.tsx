import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Link from 'next/link'
import {redirect} from 'next/navigation'
import Auth from '~/components/Auth'
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
		<div className='flex h-screen w-full flex-col items-center justify-center gap-10 p-5'>
			<div className='absolute flex h-screen w-full items-center justify-center overflow-hidden p-5 text-center'>
				<p className='flex flex-col text-[280px] text-stone-200 md:text-[350px] lg:flex-row lg:gap-[300px] lg:text-[450px] 2xl:gap-[550px]'>
					<p className='flex gap-5 md:gap-10 lg:gap-0'>
						<span>2</span>
						<span>0</span>
					</p>
					<p className='flex gap-5 md:gap-10 lg:gap-0'>
						<span>2</span>
						<span>3</span>
					</p>
				</p>
			</div>
			<div className='z-10 flex h-[80vw] w-[80vw] flex-col items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#5BDCF9] via-[#2E73FC] to-[#000AFF] p-5 text-center transition-all duration-300 sm:h-[60vw] sm:w-[60vw] sm:gap-5 sm:p-10 md:h-[50vw] md:w-[50vw] lg:p-12 xl:h-[35vw] xl:w-[35vw] 2xl:h-[20vw] 2xl:w-[20vw]'>
				<h1 className='text-stone-50'>Year in Code</h1>
				<p className='text-stone-100 lg:text-xl'>
					End the year with an AI-powered video for your GitHub stats.
				</p>
				<div className='flex flex-col items-center gap-3 lg:flex-row'>
					<Link
						href='/leaderboard'
						className='flex items-center gap-2 rounded-md border-2 border-black bg-transparent px-6 py-2 text-lg text-black no-underline transition-all hover:bg-black hover:text-white hover:opacity-100 disabled:cursor-not-allowed'>
						See leaderboard
					</Link>
					<Auth session={session} />
				</div>
			</div>
			<h3 className='absolute bottom-2 z-10 flex gap-1 text-stone-200 sm:bottom-5'>
				<span className='text-stone-400 dark:text-stone-600'>by</span>
				<Graphite />
			</h3>
		</div>
	)
}
