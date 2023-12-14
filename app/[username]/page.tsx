import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import DownloadButton from '~/components/DownloadButton'
import GitHubButton from '~/components/GitHubButton'
import Player from '~/components/Player'
import Toolbar from '~/components/Toolbar'
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
	let ogImage = `https://graphite-wrapped.vercel.app/og?title=${params.username}`

	return {
		title: `${params.username} | Year in Code | Graphite`,
		description: `End 2023 with a video of ${params.username}'s GitHub stats.`,
		openGraph: {
			title: params.username,
			url: `https://graphite-wrapped.vercel.app/${params.username}`,
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
	const profile = await getProfile(params.username)

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-5 p-5'>
			{/* User exists */}
			{profile && (
				<div
					id='videoContainer'
					className='flex w-full max-w-3xl flex-col justify-center gap-5 sm:items-center'>
					<div className='flex w-full flex-col justify-between gap-5 sm:flex-row sm:gap-0'>
						<div className='flex items-center gap-3'>
							<h1 className='text-black'>{`${params.username}`}</h1>
							<GitHubButton
								username={params.username}
								className='h-10 w-10 hover:opacity-100'
							/>
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
					<DownloadButton
						profile={profile}
						session={session}
						inputProps={{
							title: profile.user_name,
							video: profile.video_manifest as Manifest,
							stats: profile.github_stats as unknown as Stats
						}}
					/>
				</div>
			)}

			{/* User does not exist */}
			{!profile && (
				<div className='flex flex-col items-center justify-center gap-5'>
					<h3 className='text-center'>
						Oops! <span className='font-semibold'>{params.username}</span> either does
						not exist or has a private video.
					</h3>
					<Toolbar
						profile={profile}
						session={session}
					/>
				</div>
			)}
		</div>
	)
}
