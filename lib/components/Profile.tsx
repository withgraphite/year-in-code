'use client'

import DownloadControls from '~/components/DownloadControls'
import Player from '~/components/Player'
import SignInButton from '~/components/SignInButton'
import Toolbar from '~/components/Toolbar'
import {Stats} from '~/types/github'
import {Manifest} from '~/types/video'

export const ProfilePage = ({profile, error, session, username}) => {
	return (
		<div className='flex h-fit w-full flex-col items-center justify-center gap-5 p-8'>
			{/* User exists */}
			{profile && !error && (
				<div
					id='videoContainer'
					className='z-1 relative flex w-full max-w-3xl flex-col justify-center gap-5 text-white sm:items-center lg:mt-10 2xl:mt-0'>
					<Toolbar
						username={username}
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
						<span className='font-mono font-bold text-gray-200'>@{username}</span>{' '}
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
