'use client'

import {Session} from '@supabase/supabase-js'
import {Settings, Share2, User} from 'lucide-react'
import {Profile} from '~/types/profile'
import cn from '~/utils/cn'
import checkIfSelf from '~/utils/self'
import CopyLinkButton from './CopyLinkButton'
import DeleteDialog from './DeleteDialog'
import LinkedInButton from './LinkedInButton'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'
import Tooltip from './Tooltip'
import TwitterButton from './TwitterButton'
import VisibilityButton from './VisibilityButton'

export default function Toolbar({
	session,
	profile,
	username
}: {
	session: Session
	profile: Profile
	username: string
}) {
	const isOwn = checkIfSelf(session, profile)

	const labelClassNames =
		'text-xs flex items-center gap-1 text-gray-400 p-2 h-[32px] border-b border-b-white/10'

	let inner
	if (session)
		inner = (
			<div className='flex h-full w-full items-center justify-between '>
				{isOwn && (
					<div className='flex flex-col'>
						<div className={cn(labelClassNames, 'border-l border-white/10')}>
							<Settings className='h-[16px] w-[16px]' /> Controls
						</div>
						<div className='flex h-[40px] items-center border-l border-white/10'>
							<Tooltip body='Sign out'>
								<SignOutButton />
							</Tooltip>
							<VisibilityButton
								session={session}
								profile={profile}
							/>
							<DeleteDialog session={session} />
						</div>
					</div>
				)}
				<div className='flex flex-col'>
					<div className={cn(labelClassNames, 'border-l border-white/10')}>
						<Share2 className='h-[16px] w-[16px] ' /> Share
					</div>
					<div className='flex h-[40px] items-center border-l border-white/10'>
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
				</div>
			</div>
		)
	else
		inner = (
			<div className='flex flex-col'>
				<div className={labelClassNames}></div>
				<SignInButton className='h-[40px] w-fit ' />
			</div>
		)

	return (
		<div className='flex w-full flex-row items-center justify-between rounded border border-white/10 backdrop-blur'>
			<div className='flex flex-1 flex-col'>
				<div className={labelClassNames}>
					<User className='h-[16px] w-[16px]' /> Username
				</div>
				<h1 className='headline ellipsis flex h-[40px] w-fit items-center px-2 font-mono text-xl'>
					@{`${username}`}
				</h1>
			</div>
			<div className='flex h-full items-center gap-5'>{inner}</div>
		</div>
	)
}
