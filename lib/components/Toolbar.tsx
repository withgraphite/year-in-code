'use client'

import {Session} from '@supabase/supabase-js'
import {Profile} from '~/types/profile'
import CopyLinkButton from './CopyLinkButton'
import DeleteButton from './DeleteButton'
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
	return (
		<div className='flex h-full items-center gap-5'>
			{session && (
				<div className='flex h-full w-full items-center justify-between gap-2 sm:w-fit sm:justify-end'>
					<SignOutButton />
					<DeleteButton session={session} />
					<VisibilityButton
						session={session}
						profile={profile}
					/>
					<CopyLinkButton profile={profile} />
					<LinkedInButton profile={profile} />
					<TwitterButton profile={profile} />
				</div>
			)}
			{!session && <SignInButton />}
		</div>
	)
}
