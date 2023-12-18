'use client'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import GraphiteCTA from './GraphiteCTA'

export default function Nav() {
	const pathname = usePathname()
	const router = useRouter()
	if (pathname === '/loading') return

	return (
		<nav className='absolute left-0 top-0 z-50 flex w-full items-center justify-center p-5'>
			<div className='flex w-full max-w-3xl flex-col items-center justify-center gap-3'>
				<GraphiteCTA className='text-2xl' />
				{pathname !== '/' && (
					<div className='flex w-full max-w-3xl items-center justify-center'>
						<Link
							className={`border-r border-black px-3 text-xl no-underline ${
								pathname !== '/leaderboard' ? 'font-bold' : ''
							}`}
							href='/'>
							Year in code
						</Link>
						<Link
							className={`px-3 text-xl no-underline ${
								pathname === '/leaderboard' ? 'font-bold' : ''
							}`}
							href='/leaderboard'>
							Leaderboard
						</Link>
					</div>
				)}
			</div>
		</nav>
	)
}
