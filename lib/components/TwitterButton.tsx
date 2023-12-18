'use client'

import {TwitterIcon} from 'lucide-react'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import {Profile} from '~/types/profile'
import Tooltip from './Tooltip'

export default function TwitterButton({
	isOwn,
	profile
}: {
	isOwn: boolean
	profile: Profile
}) {
	const body = `Check ${
		isOwn ? 'my' : `${profile.user_name}'s`
	} Year in code by Graphite`
	const url = META.domain.prod + profile.user_name
	return (
		<Tooltip body='Twitter'>
			<Link
				href={`https://twitter.com/intent/tweet?text=${body}&url=${url}`}
				target='_blank'>
				<button className='group rounded-md p-2'>
					<TwitterIcon className='h-5 w-5 transition-transform duration-300 group-hover:-rotate-12' />
				</button>
			</Link>
		</Tooltip>
	)
}
