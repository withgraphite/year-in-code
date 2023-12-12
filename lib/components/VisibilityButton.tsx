'use client'
import {
	Session,
	createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import {EyeIcon, EyeOffIcon} from 'lucide-react'
import {useState} from 'react'
import {toast} from 'sonner'
import {Profile} from '~/types/profile'
import Tooltip from './Tooltip'

export default function VisibilityButton({
	session,
	profile
}: {
	session: Session
	profile: Profile
}) {
	const supabase = createClientComponentClient()
	const [isPublic, setIsPublic] = useState(profile.is_public)

	const handleVisibility = async () => {
		const {data, error} = await supabase
			.from('profile')
			.update({is_public: !isPublic})
			.eq('id', session.user.id)

		if (!error) {
			setIsPublic(prev => !prev)
			toast.success(isPublic ? 'Video is now private' : 'Video is now public')
		} else toast.error(error.message)
	}

	return (
		<Tooltip body={isPublic ? 'Make private' : 'Make public'}>
			<button
				className='group bg-transparent p-2 text-lg text-black hover:bg-black hover:text-white'
				onClick={handleVisibility}>
				{isPublic ? (
					<EyeIcon className='h-5 w-5' />
				) : (
					<EyeOffIcon className='h-5 w-5' />
				)}
			</button>
		</Tooltip>
	)
}
