'use client'

import {Session} from '@supabase/supabase-js'
import {ImageIcon} from 'lucide-react'
import {Stats} from '~/types/github'
import {Profile} from '~/types/profile'
import download from '~/utils/save'
import checkIfSelf from '~/utils/self'
import Summary from './summary'

export default function DownloadImage({
	stats,
	session,
	profile
}: {
	stats: Stats
	session: Session
	profile: Profile
}) {
	const isOwn = checkIfSelf(session, profile)

	// if (!isOwn) return

	return (
		<>
			<button
				className='px-6 py-2 text-sm hover:opacity-80 sm:text-xl'
				onClick={() => download(stats)}>
				<ImageIcon className='h-5 w-5' />
				Download image
			</button>
			<div className='fixed z-[-100] h-[720px] w-[1280px] scale-[10%]'>
				<div
					id='stats'
					style={{backgroundImage: `url('/assets/sky.jpg')`}}
					className='flex h-full w-full items-center justify-center bg-black'>
					{/* <div className='flex flex-col items-center justify-center'> */}
					{/* <h1 className='pb-10 text-white'>{stats.username}</h1> */}
					<Summary stats={stats} />
					{/* </div> */}
				</div>
			</div>
		</>
	)
}
