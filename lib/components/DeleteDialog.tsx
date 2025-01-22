'use client'

import {track} from '@vercel/analytics'
import {TrashIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {toast} from 'sonner'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from './Dialog'
import Tooltip from './Tooltip'
import { useContext } from 'react'
import { SessionContext } from '~/context/session'

export default function DeleteButton() {
	const { supabase, session } = useContext(SessionContext);
	const router = useRouter()

	// Handle delete
	const handleDelete = async () => {
		const {data, error} = await supabase
			.from('profile')
			.delete()
			.eq('id', session.user.id)
		if (error) {
			toast.error(error.message)
			track('Delete', {success: false, error: error.message})
		} else {
			toast.success('Video deleted')
			setTimeout(() => {
				toast.loading('Redirecting now...')
			}, 1 * 1000)
			setTimeout(async () => {
				await supabase.auth.signOut()
				router.push('/')
			}, 3 * 1000)
			track('Delete', {success: true})
		}
	}
	return (
		<Tooltip body='Delete'>
			<AlertDialog>
				<AlertDialogTrigger className='group p-2'>
					<TrashIcon className='h-5 w-5 text-white group-hover:text-red-500' />
				</AlertDialogTrigger>
				<AlertDialogContent className='bg-black'>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete your video.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className='text-white'>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className='border-none p-0'
							onClick={handleDelete}>
							<span className='h-full w-full rounded-xl border-2 border-red-500 bg-red-200 px-6 py-2 text-red-500 transition-colors duration-300 hover:bg-red-300 hover:text-red-600'>
								Delete
							</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Tooltip>
	)
}
