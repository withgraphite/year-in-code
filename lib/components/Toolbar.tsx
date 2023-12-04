'use client'

import {Session} from '@supabase/supabase-js'
import {toast} from 'sonner'
import Auth from './Auth'

export default function Toolbar({session}: {session: Session}) {
	const handleShare = () => {
		window.navigator.clipboard.writeText(document.location.href)
		toast.success('Link copied to clipboard')
	}
	return (
		<div className='flex items-center gap-5'>
			<button onClick={() => toast.loading('Downloading now...')}>Download</button>
			<button onClick={handleShare}>Share</button>
			<Auth session={session} />
		</div>
	)
}
