'use client'
import {track} from '@vercel/analytics'
import {ArrowRight, Eye} from 'lucide-react'
import {useRouter} from 'next/navigation'
import { useCallback, useContext } from 'react'
import {toast} from 'sonner'
import { SessionContext } from '~/context/session'
import cn from '~/utils/cn'


export default function SignInButton({className}: {className?: string}) {
	const { supabase, session } = useContext(SessionContext)
	const router = useRouter();

	const handleSignIn = useCallback(async() => {
		track('Signin')
		if (session)
			router.push(`/user/${session.user.user_metadata.user_name}`)
		else {
			const {error} = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: location.origin + '/auth/callback',
					scopes: 'repo:status read:user'
				}
			})
			if (error) toast.error(error.message)
		}

	}, [session])
	
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
