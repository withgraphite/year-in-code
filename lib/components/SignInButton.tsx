'use client'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {ArrowRight} from 'lucide-react'
import {toast} from 'sonner'
import {Database} from '~/types/supabase'

export default function SignInButton() {
	const supabase = createClientComponentClient<Database>()

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
	return (
		<button
			onClick={handleLogin}
			className='group text-lg'>
			<span>Get started</span>
			<ArrowRight className='h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
		</button>
	)
}
