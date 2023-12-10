'use client'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {ArrowRight} from 'lucide-react'
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
		else {
			router.refresh()
			router.push('/')
		}
	}

	return (
		<button
			onClick={handleSignOut}
			className='group text-lg'>
			<span>Sign out</span>
			<ArrowRight className='h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
		</button>
	)
}
