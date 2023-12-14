import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import GitHubButton from '~/components/GitHubButton'
import GraphiteBadge from '~/components/GraphiteBadge'
import GraphiteCTA from '~/components/GraphiteCTA'
import SignInButton from '~/components/SignInButton'
import {DEFAULT_META} from '~/constants/metadata'

export const dynamic = 'force-dynamic'

export const metadata = {
	...DEFAULT_META,
	title: 'Leaderboard | Year in Code | Graphite',
	description: 'See who opened the most pull requests in 2023.'
}

export default async function LeaderBoard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	const {data, error} = await supabase
		.from('profile')
		.select(
			'user_name, company, avatar_url, pull_requests_opened, is_graphite_user'
		)
		.order('pull_requests_opened', {ascending: false})
		.eq('is_public', true)
		.limit(50)
	if (error) console.error(error.message)

	return (
		<div className='flex min-h-screen w-full flex-col items-center gap-5 p-5 pb-[50%] pt-20'>
			<div className='flex w-full flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0'>
				<div>
					<h1>Leaderboard</h1>
					<h3 className='flex flex-wrap gap-1 text-stone-500'>
						Close more pull requests with <GraphiteCTA className='text-stone-600' />
					</h3>
				</div>
				{!session && <SignInButton className='w-full sm:w-fit' />}
			</div>
			<div className='group/table grid w-full gap-3'>
				<div className='grid w-full grid-cols-6 items-center justify-between border-b border-stone-300 font-thin text-stone-500 opacity-0 transition-opacity duration-300 group-hover/table:opacity-100'>
					<p>Rank</p>
					<p className='col-span-3 col-start-2'>Username</p>
					<p className='col-span-2 col-start-5 text-right'>Pull requests opened</p>
				</div>
				{data.map((item, i) => (
					<div
						key={item.user_name}
						className='grid w-full grid-cols-6 items-center justify-between'>
						<span>{i + 1}</span>
						<div className='group/item relative col-span-3 col-start-2 flex items-center gap-2'>
							{item.is_graphite_user && <GraphiteBadge />}
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
							<p className='hidden text-stone-500 sm:flex'>{item.company}</p>
							<GitHubButton
								username={item.user_name}
								className='h-[30px] w-[30px] opacity-0 group-hover/item:opacity-100'
							/>
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
