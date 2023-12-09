import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {GithubIcon} from 'lucide-react'
import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import Graphite from '~/components/Graphite'
import SignInButton from '~/components/SignInButton'

export const dynamic = 'force-dynamic'

export default async function LeaderBoard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	const {data, error} = await supabase
		.from('profile')
		.select('user_name, company, avatar_url, pull_requests_opened')
		.order('pull_requests_opened', {ascending: false})
		.limit(50)
	if (error) console.error(error.message)

	return (
		<div className='flex h-screen w-full flex-col items-center gap-5 p-5 pt-20'>
			<div className='flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0'>
				<div>
					<h1>Leaderboard</h1>
					<h3 className='flex flex-wrap gap-1 text-stone-500'>
						Close more pull requests with <Graphite />
					</h3>
				</div>
				{!session && <SignInButton />}
			</div>
			<div className='group/table grid w-full gap-3'>
				<div className='grid w-full grid-cols-6 items-center justify-between border-b border-stone-300 font-extrabold font-thin text-stone-500 opacity-0 transition-opacity duration-300 group-hover/table:opacity-100'>
					<p>Rank</p>
					<p className='col-span-3 col-start-2'>Username</p>
					<p className='col-span-2 col-start-5 text-right'>Pull requests opened</p>
				</div>
				{data.map((item, i) => (
					<div
						key={item.user_name}
						className='grid w-full grid-cols-6 items-center justify-between'>
						<span>{i + 1}</span>
						<div className='group/item col-span-3 col-start-2 flex items-center gap-2'>
							{item.avatar_url && (
								<Image
									src={item.avatar_url}
									width={30}
									height={30}
									className='rounded-full transition-transform duration-300 hover:scale-125'
									alt={`Profile picture`}
								/>
							)}
							<Link
								href={`/${item.user_name}`}
								className='no-underline hover:underline'>
								<p>{item.user_name}</p>
							</Link>
							<p className='hidden text-stone-500 dark:text-stone-600 sm:flex'>
								{item.company}
							</p>
							<Link
								href={`https://github.com/${item.user_name}`}
								target='_blank'>
								<GithubIcon className='h-[30px] w-[30px] rounded-full p-1 opacity-0 transition-all duration-300 hover:bg-black hover:text-white group-hover/item:opacity-100' />
							</Link>
							{/* <ArrowUpRight className='opacity-0 transition-opacity duration-300 group-hover/item:opacity-100' /> */}
						</div>
						<p className='col-span-2 col-start-5 text-right'>
							{item.pull_requests_opened}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}
