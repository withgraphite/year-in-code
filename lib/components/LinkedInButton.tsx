'use client'

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
	const body = `Check ${
		isOwn ? 'my' : `${profile.user_name}'s`
	} Year in Code by Graphite`
	const url = META.domain.prod + profile.user_name
	return (
		<Tooltip body='LinkedIn'>
			<Link
				target='_blank'
				href={`https://www.linkedin.com/feed/?shareActive=true&text=${body} ${url} %23YearInCode %23Graphite %232023`}>
				<button className='group rounded-md p-2'>
					<LinkedinIcon className='h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5' />
				</button>
			</Link>
		</Tooltip>
	)
}
