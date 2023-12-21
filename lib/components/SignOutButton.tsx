'use client'

import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {track} from '@vercel/analytics'
import {LogOutIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {Database} from '~/types/supabase'
import cn from '~/utils/cn'

export default function SignOutButton({
	className,
	expand
}: {
	className?: string
	expand?: boolean
}) {
	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	// Sign out
	async function handleSignOut() {
		track('Signout')
		const {error} = await supabase.auth.signOut()
		if (error) toast.error(error.message)
		else router.push('/')
	}

	return (
		<button
			onClick={handleSignOut}
			className={cn(
				'group rounded-md bg-transparent p-2 text-lg text-black hover:bg-black hover:text-white',
				className
			)}>
			<LogOutIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5' />
			{expand && <span>Sign out</span>}
		</button>
	)
}
