import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import DownloadControls from '~/components/DownloadControls'
import Player from '~/components/Player'
import SignInButton from '~/components/SignInButton'
import Toolbar from '~/components/Toolbar'
import {META} from '~/constants/metadata'
import {Stats} from '~/types/github'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import {default as getProfile} from '~/utils/profile'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
	params
}: {
	params: {username: string}
}): Promise<Metadata | undefined> {
	if (!params.username) return
	let ogImage = META.domain.prod + `og?title=${params.username}`

	return {
		title: `${params.username} | Year in code | Graphite`,
		description: `Check out ${params.username}'s 2024 year in code!`,
		openGraph: {
			title: `${params.username} | Year in code | Graphite`,
			url: META.domain.prod + params.username,
			description: `Check out ${params.username}'s 2024 year in code!`,
			images: [
				{
					url: ogImage
				}
			]
		},
		twitter: {
			title: `${params.username} | Year in code | Graphite`,
			description: `Check out ${params.username}'s 2024 year in code!`,
			images: [
				{
					url: ogImage
				}
			]
		}
	}
}

export default async function Profile({params}: {params: {username: string}}) {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	const {data: profile, error} = await getProfile(params.username, session)
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			{/* User exists */}
			{profile && !error && (
				<div
					id='videoContainer'
					className='flex w-full max-w-3xl flex-col justify-center gap-5 sm:items-center lg:mt-10 2xl:mt-0'>
					<div className='flex w-full flex-col justify-between gap-5 sm:flex-row sm:gap-0'>
						<div className='flex items-center gap-3'>
							<h1 className='text-black'>{`${params.username}`}</h1>
						</div>
						<Toolbar
							profile={profile}
							session={session}
						/>
					</div>
					{profile && (
						<Player
							video={profile.video_manifest as Manifest}
							stats={profile.github_stats as unknown as Stats}
						/>
					)}
					<p className='w-full text-center text-white sm:hidden'>
						For the complete experience, play on desktop.
					</p>
					<DownloadControls
						profile={profile}
						session={session}
						inputProps={{
							title: profile.user_name,
							userId: profile.id,
							video: profile.video_manifest as Manifest,
							stats: profile.github_stats as unknown as Stats
						}}
					/>
				</div>
			)}

			{/* Error handling */}
			{error && (
				<div className='flex flex-col items-center justify-center gap-5'>
					<h2 className='text-center font-thin'>
						Oops! <span className='font-semibold'>{params.username}</span>{' '}
						{error === 'Incomplete profile' ? (
							<span>has an incomplete video. Try again.</span>
						) : (
							<span>either does not exist, or has a private video.</span>
						)}
					</h2>
					{!session && <SignInButton />}
				</div>
			)}
		</div>
	)
}
