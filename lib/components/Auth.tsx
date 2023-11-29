'use client'
import {
	Session,
	createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'

// Handle Login & Logout
export default function Auth({session}: {session: Session}) {
	const supabase = createClientComponentClient()
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
		<button onClick={session ? handleLogout : handleLogin}>
			{session ? 'Sign out' : 'Sign in'}
		</button>
	)
}
