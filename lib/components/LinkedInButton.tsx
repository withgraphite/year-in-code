'use client'

import {LinkedinIcon} from 'lucide-react'
import Link from 'next/link'
import {DOMAIN} from '~/constants/metadata'
import {Profile} from '~/types/profile'

export default function LinkedInButton({profile}: {profile: Profile}) {
	const body = 'Check my Year in Code by Graphite'
	const url = DOMAIN.PROD + profile.user_name
	return (
		<Link
			target='_blank'
			href={`https://www.linkedin.com/feed/?shareActive=true&text=${body} ${url} %23YearInCode %23Graphite %232023`}>
			<button className='p-2'>
				<LinkedinIcon className='h-5 w-5' />
			</button>
		</Link>
	)
}
