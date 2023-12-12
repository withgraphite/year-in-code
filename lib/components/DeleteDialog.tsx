'use client'

import {
	Session,
	createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
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

export default function DeleteButton({session}: {session: Session}) {
	const supabase = createClientComponentClient()
	const router = useRouter()

	// Handle delete
	const handleDelete = async () => {
		const {data, error} = await supabase
			.from('profile')
			.delete()
			.eq('id', session.user.id)
		if (error) toast.error(error.message)
		else {
			toast.success('Video deleted')
			setTimeout(() => {
				toast.loading('Redirecting now...')
			}, 1 * 1000)
			setTimeout(async () => {
				await supabase.auth.signOut()
				router.push('/')
			}, 3 * 1000)
		}
	}
	return (
		<Tooltip body='Delete'>
			<AlertDialog>
				<AlertDialogTrigger className='group p-2 hover:border-red-500 hover:bg-red-200'>
					<TrashIcon className='h-5 w-5 text-black group-hover:text-red-500' />
				</AlertDialogTrigger>
				<AlertDialogContent className='bg-white'>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete your video.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className='text-black hover:bg-black hover:text-white'>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className='border-none p-0'
							onClick={handleDelete}>
							<span className='h-full w-full rounded-md border-2 border-red-500 bg-red-200 px-6 py-2 text-red-500 transition-colors duration-300 hover:bg-red-300 hover:text-red-600'>
								Delete
							</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Tooltip>
	)
}
