'use client'

import {track} from '@vercel/analytics'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import {Profile} from '~/types/profile'
import Tooltip from './Tooltip'
import {IconLinkedIn} from './icons/LinkedIn'

export default function LinkedInButton({
	isOwn,
	profile
}: {
	isOwn: boolean
	profile: Profile
}) {
	const text = `Check out ${
		isOwn ? 'my' : `${profile.user_name}'s`
	} 2024 year in code! Get yours now.`
	const hashtags = '%24YearInCode2024'
	const url = META.domain.prod + profile.user_name
	return (
		<Tooltip body='LinkedIn'>
			<Link
				target='_blank'
				href={`https://www.linkedin.com/feed/?shareActive=true&text=${text} ${hashtags} ${url}`}>
				<button
					className='group rounded-md p-2'
					onClick={() => track('Share: LinkedIn')}>
					<IconLinkedIn className='h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5' />
				</button>
			</Link>
		</Tooltip>
	)
}
