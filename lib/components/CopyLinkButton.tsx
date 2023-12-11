'use client'

import {LinkIcon} from 'lucide-react'
import {toast} from 'sonner'
import {DOMAIN} from '~/constants/metadata'
import {Profile} from '~/types/profile'

export default function CopyLinkButton({profile}: {profile: Profile}) {
	const handleCopy = () => {
		window.navigator.clipboard.writeText(DOMAIN.PROD + profile.user_name)
		toast.success('Link copied to clipboard')
	}

	return (
		<button
			className='p-2'
			onClick={handleCopy}>
			<LinkIcon className='h-5 w-5' />
		</button>
	)
}
