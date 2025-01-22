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
import getProfile from '~/utils/profile'

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
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-8'>
			{/* User exists */}
			{profile && !error && (
				<div
					id='videoContainer'
					className='z-1 relative flex w-full max-w-3xl flex-col justify-center gap-5 text-white sm:items-center lg:mt-10 2xl:mt-0'>
					<Toolbar
						username={params.username}
						profile={profile}
						session={session}
					/>

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
				<div className='z-1 relative flex flex-col items-center justify-center gap-6'>
					<h3 className='text-pretty text-center text-gray-300'>
						Oops!{' '}
						<span className='font-mono font-bold text-gray-200'>
							@{params.username}
						</span>{' '}
						{error === 'Incomplete profile' ? (
							<span>has an incomplete video. Try again.</span>
						) : (
							<span>either does not exist, or has a private video.</span>
						)}
					</h3>
					{!session && <SignInButton />}
				</div>
			)}
		</div>
	)
}
