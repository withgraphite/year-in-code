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
		<div className='mt-32 flex min-h-screen w-full flex-col items-center gap-5 sm:mb-32'>
			<div className='w-full max-w-3xl rounded-xl bg-white/60 p-5'>
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
						<p className='col-span-5 col-start-2'>Username</p>
						<p className='col-span-2 col-start-7 text-right'>Pull requests opened</p>
					</div>
					{data.map((item, i) => (
						<div
							key={item.user_name}
							className='grid w-full grid-cols-8 items-center justify-between border-t border-black/50 py-2'>
							<span className='text-xl font-light'>{i + 1}</span>
							<div className='group/item relative col-span-6 col-start-2 flex items-center gap-2 text-black'>
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
									className='font-light no-underline hover:underline'>
									<p>{item.user_name}</p>
								</Link>
								{item.company && (
									<p className='hidden font-light text-black/50 sm:flex'>
										{item.company}
									</p>
								)}
								{item.is_graphite_user && <GraphiteBadge />}
							</div>
							<p className='text-right text-xl font-light'>
								{item.pull_requests_opened}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
