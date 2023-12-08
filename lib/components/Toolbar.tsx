'use client'

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Session} from '@supabase/supabase-js'
import {ArrowUpRight} from 'lucide-react'
import {toast} from 'sonner'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

export default function Toolbar({session}: {session: Session}) {
	const supabase = createClientComponentClient()

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
			{session && <SignOutButton />}
			{session && (
				<button
					className='group text-xl'
					onClick={handleShare}>
					<span>Share</span>
					<ArrowUpRight className='transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
				</button>
			)}
			{!session && <SignInButton />}
		</div>
	)
}
