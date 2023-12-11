'use client'

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {LogOutIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {Database} from '~/types/supabase'

export default function SignOutButton() {
	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	// Sign out
	async function handleSignOut() {
		const {error} = await supabase.auth.signOut()
		if (error) toast.error(error.message)
		else router.push('/')
	}

	return (
		<button
			onClick={handleSignOut}
			className='group bg-white p-2 text-lg text-black hover:bg-black hover:text-white'>
			<LogOutIcon className='h-5 w-5' />
		</button>
	)
}
