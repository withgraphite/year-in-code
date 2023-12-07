'use client'

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Session} from '@supabase/supabase-js'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import Auth from './Auth'

export default function Toolbar({session}: {session: Session}) {
	const supabase = createClientComponentClient()
	const router = useRouter()

	const handleShare = () => {
		window.navigator.clipboard.writeText(document.location.href)
		toast.success('Link copied to clipboard')
	}

	const handleDelete = async () => {
		const {data, error} = await supabase
			.from('profile')
			.delete()
			.eq('id', session.user.id)
		if (error) toast.error(error.message)
		else toast.loading('Regenerating')
	}

	return (
		<div className='flex items-center gap-5'>
			<button
				onClick={handleShare}
				className='bg-white text-xl text-black'>
				Share
			</button>
			<Auth session={session} />
		</div>
	)
}
