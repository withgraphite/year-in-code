import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
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
		<div className='justify-starts flex min-h-screen w-full flex-col gap-5 p-5 pt-20'>
			<div className='flex w-full items-center justify-between'>
				<div>
					<h2>Leaderboard</h2>
					<h3 className='text-stone-500'>Close more pull requests with Graphite.</h3>
				</div>
				{!session && <SignInButton />}
			</div>
			<div className='group grid w-full gap-3'>
				<div className='grid w-full grid-cols-6 items-center justify-between border-b font-extrabold text-stone-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
					<p>Rank</p>
					<p className='col-span-3 col-start-2'>Username</p>
					<p className='col-span-2 col-start-5 text-right'>Pull requests opened</p>
				</div>
				{data.map((item, i) => (
					<div
						key={item.user_name}
						className='grid w-full grid-cols-6 items-center justify-between'>
						<span>{i + 1}</span>
						<div className='col-span-3 col-start-2 flex items-center gap-2'>
							{item.avatar_url && (
								<Image
									src={item.avatar_url}
									width={30}
									height={30}
									className='rounded-full'
									alt={`Profile picture`}
								/>
							)}
							<Link
								href={`/${item.user_name}`}
								className='no-underline hover:underline hover:underline-offset-4'>
								<p>{item.user_name}</p>
							</Link>
							<p className='text-stone-500 dark:text-stone-600'>{item.company}</p>
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
