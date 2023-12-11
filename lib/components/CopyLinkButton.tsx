'use client'

import {LinkIcon} from 'lucide-react'
import {toast} from 'sonner'

export default function CopyLinkButton() {
	const handleCopy = () => {
		window.navigator.clipboard.writeText(document.location.href)
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
