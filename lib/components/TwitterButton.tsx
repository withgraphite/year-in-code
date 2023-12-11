'use client'

import {TwitterIcon} from 'lucide-react'
import Link from 'next/link'
import {DOMAIN} from '~/constants/metadata'
import {Profile} from '~/types/profile'
import Tooltip from './Tooltip'

export default function TwitterButton({profile}: {profile: Profile}) {
	const body = 'Check my Year in Code by Graphite'
	const url = DOMAIN.PROD + profile.user_name
	return (
		<Tooltip body='Twitter'>
			<Link
				href={`https://twitter.com/intent/tweet?text=${body}&url=${url}`}
				target='_blank'>
				<button className='group p-2'>
					<TwitterIcon className='h-5 w-5 transition-transform duration-300 group-hover:-rotate-12' />
				</button>
			</Link>
		</Tooltip>
	)
}
