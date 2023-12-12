'use client'

import {Session} from '@supabase/supabase-js'
import {Profile} from '~/types/profile'
import checkIfSelf from '~/utils/self'
import CopyLinkButton from './CopyLinkButton'
import DeleteDialog from './DeleteDialog'
import LinkedInButton from './LinkedInButton'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'
import TwitterButton from './TwitterButton'
import VisibilityButton from './VisibilityButton'

export default function Toolbar({
	session,
	profile
}: {
	session: Session
	profile: Profile
}) {
	const isOwn = checkIfSelf(session, profile)
	return (
		<div className='flex h-full items-center gap-5'>
			{session && (
				<div className='flex h-full w-full items-center justify-between gap-2 sm:w-fit sm:justify-end'>
					<SignOutButton />
					{isOwn && <DeleteDialog session={session} />}
					{isOwn && (
						<VisibilityButton
							session={session}
							profile={profile}
						/>
					)}
					<CopyLinkButton profile={profile} />
					<LinkedInButton
						isOwn={isOwn}
						profile={profile}
					/>
					<TwitterButton
						isOwn={isOwn}
						profile={profile}
					/>
				</div>
			)}
			{!session && <SignInButton />}
		</div>
	)
}
