'use client'
import {
	Session,
	createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import {ArrowRight} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {Database} from '~/types/supabase'

// Handle Login & Logout
export default function Auth({session}: {session: Session}) {
	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	// Login - also handles sign ups
	async function handleLogin() {
		const {error} = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: location.origin + '/auth/callback',
				scopes: 'repo:status read:user'
			}
		})
		if (error) toast.error(error.message)
	}

	// Logout
	async function handleLogout() {
		const {error} = await supabase.auth.signOut()
		if (error) toast.error(error.message)
		else router.refresh()
	}

	return (
		<button
			onClick={session ? handleLogout : handleLogin}
			className='group flex items-center gap-2 text-xl'>
			{session ? 'Sign out' : 'Get started'}
			<ArrowRight className='h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
		</button>
	)
}
