import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
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

function LineItem({
	index,
	userName,
	avatarUrl,
	company,
	isGraphiteUser,
	pullRequestsOpened
}: {
	index: number
	userName: string
	avatarUrl: string
	company: string
	isGraphiteUser: boolean
	pullRequestsOpened: number
}) {
	return (
		<div className='grid w-full grid-cols-8 items-center justify-between border-t border-black/50 py-2'>
			<span className='text-xl font-light'>{index + 1}</span>
			<div className='group/item relative col-span-6 col-start-2 flex items-center gap-2 text-black'>
				{avatarUrl && (
					<Image
						src={avatarUrl}
						width={30}
						height={30}
						className='rounded-full transition-transform duration-300 hover:scale-125'
						alt={`Profile picture`}
					/>
				)}
				<Link
					href={`/${userName}`}
					className='font-light no-underline hover:underline'>
					<p>{userName}</p>
				</Link>
				{company && (
					<p className='hidden font-light text-black/50 sm:flex'>{company}</p>
				)}
				{isGraphiteUser && <GraphiteBadge />}
			</div>
			<p className='text-right text-xl font-light'>{pullRequestsOpened}</p>
		</div>
	)
}

export default async function LeaderBoard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	const {data, error} = await supabase
		.from('leaderboard')
		.select('*')
		.order('pull_requests_opened', {ascending: false})
	if (error) console.error(error.message)

	return (
		<div className='my-32 flex min-h-screen w-full flex-col items-center gap-5'>
			<div className='flex w-full max-w-3xl flex-col gap-3 rounded-xl bg-white/60 p-5'>
				<div className='flex w-full flex-col items-center justify-between gap-5 sm:flex-row sm:gap-0'>
					<div>
						<h1 className='font-extralight'>Leaderboard</h1>
						<h3 className='flex flex-wrap gap-1 font-thin'>
							Close more pull requests with{' '}
							<GraphiteCTA
								showIcon
								className='font-thin'
							/>
						</h3>
					</div>
					{!session && <SignInButton className='w-full sm:w-fit' />}
				</div>
				<div className='group/table grid w-full'>
					<div className='grid w-full grid-cols-8 items-center justify-between border-b border-stone-300 font-thin opacity-0 transition-opacity duration-300 group-hover/table:opacity-100'>
						<p>Rank</p>
						<p className='col-span-4 col-start-2 sm:col-span-5'>Username</p>
						<p className='col-span-3 col-start-6 text-right sm:col-span-2 sm:col-start-7'>
							Pull requests opened
						</p>
					</div>
					{data.map((item, i) => (
						<LineItem
							key={item.user}
							index={i}
							userName={item.user_name}
							avatarUrl={item.avatar_url}
							company={item.company}
							isGraphiteUser={item.is_graphite_user}
							pullRequestsOpened={item.pull_requests_opened}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
