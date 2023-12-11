'use client'

import {Session} from '@supabase/supabase-js'
import {Profile} from '~/types/profile'
import CopyLinkButton from './CopyLinkButton'
import DeleteButton from './DeleteButton'
import LinkedInButton from './LinkedInButton'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'
import TwitterButton from './TwitterButton'

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
				<div className='flex h-full items-center gap-2'>
					<SignOutButton />
					<DeleteButton session={session} />
					<CopyLinkButton profile={profile} />
					<LinkedInButton />
					<TwitterButton profile={profile} />
				</div>
			)}
			{!session && <SignInButton />}
		</div>
	)
}
