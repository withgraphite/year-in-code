'use client'
import {
	Session,
	createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import {track} from '@vercel/analytics'
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
			track('Update visibility', {success: true})
		} else {
			toast.error(error.message)
			track('Update visibility', {success: false, error: error.message})
		}
	}

	return (
		<Tooltip body={isPublic ? 'Make private' : 'Make public'}>
			<button
				className='group rounded-md p-2 text-lg text-white'
				onClick={handleVisibility}>
				{isPublic ? (
					<div className='group relative h-5 w-5'>
						<EyeIcon
							className={`absolute left-0 top-0 h-5 w-5 transition-opacity duration-150 group-hover:opacity-0`}
						/>
						<EyeOffIcon
							className={`absolute left-0 top-0 h-5 w-5 opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
						/>
					</div>
				) : (
					<div className='group relative h-5 w-5'>
						<EyeOffIcon
							className={`absolute left-0 top-0 h-5 w-5 transition-opacity duration-150 group-hover:opacity-0`}
						/>
						<EyeIcon
							className={`absolute left-0 top-0 h-5 w-5 opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
						/>
					</div>
				)}
			</button>
		</Tooltip>
	)
}
