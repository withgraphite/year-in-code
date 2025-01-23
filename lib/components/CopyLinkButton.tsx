'use client'
import {track} from '@vercel/analytics'
import {LinkIcon} from 'lucide-react'
import {toast} from 'sonner'
import {META} from '~/constants/metadata'
import {Profile} from '~/types/profile'
import Tooltip from './Tooltip'

export default function CopyLinkButton({profile}: {profile: Profile}) {
	const handleCopy = () => {
		window.navigator.clipboard.writeText(
			META.domain.prod + 'user/' + profile.user_name
		)
		toast.success('Link copied to clipboard')
		track('Copy link')
	}

	return (
		<Tooltip body='Copy link'>
			<button
				className='p-2'
				onClick={handleCopy}>
				<LinkIcon className='h-5 w-5' />
			</button>
		</Tooltip>
	)
}
