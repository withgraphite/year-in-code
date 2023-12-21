'use client'

import {DownloadIcon} from 'lucide-react'
import {Stats} from '~/types/github'
import download from '~/utils/save'
import Summary from './summary'

export default function DownloadImage({stats}: {stats: Stats}) {
	return (
		<>
			<button
				className={`group px-6 py-2 text-sm hover:opacity-80 sm:text-xl`}
				onClick={() => {
					download(stats)
				}}>
				<DownloadIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5' />
				Download Image
			</button>
			<div className='fixed z-[-100] h-[820px] w-[1280px] scale-[10%]'>
				<div
					id='stats'
					style={{backgroundImage: `url('/assets/sky.jpg')`}}
					className='flex h-full w-full items-center justify-center bg-black'>
					<div className='flex flex-col items-center justify-center'>
						<h1 className='pb-10 text-white'>{stats.username}</h1>
						<Summary stats={stats} />
					</div>
				</div>
			</div>
		</>
	)
}
