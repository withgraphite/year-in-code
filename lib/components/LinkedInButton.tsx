'use client'

import {track} from '@vercel/analytics'
import {LinkedinIcon} from 'lucide-react'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import {Profile} from '~/types/profile'
import Tooltip from './Tooltip'

export default function LinkedInButton({
	isOwn,
	profile
}: {
	isOwn: boolean
	profile: Profile
}) {
	const text = `Check out ${
		isOwn ? 'my' : `${profile.user_name}'s`
	} 2023 year in code! Get yours now.`
	const hashtags = '%23yearInCode2023'
	const url = META.domain.prod + profile.user_name
	return (
		<Tooltip body='LinkedIn'>
			<Link
				target='_blank'
				href={`https://www.linkedin.com/feed/?shareActive=true&text=${text} ${hashtags} ${url}`}>
				<button
					className='group rounded-md p-2'
					onClick={() => track('Share: LinkedIn')}>
					<LinkedinIcon className='h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5' />
				</button>
			</Link>
		</Tooltip>
	)
}
