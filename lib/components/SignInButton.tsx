'use client'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {track} from '@vercel/analytics'
import {ArrowRight} from 'lucide-react'
import {toast} from 'sonner'
import {Database} from '~/types/supabase'
import cn from '~/utils/cn'

export default function SignInButton({className}: {className?: string}) {
	const supabase = createClientComponentClient<Database>()

	// Login - also handles sign ups
	async function handleSignIn() {
		track('Signin')
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
			onClick={handleSignIn}
			className={cn('group h-full w-full bg-white p-4 text-black', className)}>
			<span className='flex items-center gap-2 '>
				<Eye /> See yours
			</span>
			<ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
		</button>
	)
}
