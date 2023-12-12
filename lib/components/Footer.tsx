'use client'
import {usePathname} from 'next/navigation'
import Graphite from './Graphite'

export default function Footer() {
	const pathname = usePathname()
	if (pathname !== '/leaderboard')
		return (
			<footer className='absolute bottom-2 left-0 z-10 flex w-full items-center justify-center gap-1.5 text-xl text-stone-200 md:bottom-5'>
				<span className='text-stone-400'>by</span>
				<Graphite />
			</footer>
		)
}
