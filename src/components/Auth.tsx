'use client'
import {
	Session,
	createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import {useRouter} from 'next/navigation'

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
	}

	// Logout
	async function handleLogout() {
		const {error} = await supabase.auth.signOut()
		if (!error) router.refresh()
	}

	return (
		<button
			className='mb-2 rounded-md bg-stone-700 px-4 py-2 text-white'
			onClick={session ? handleLogout : handleLogin}>
			{session ? 'Sign out' : 'Sign in'}
		</button>
	)
}
