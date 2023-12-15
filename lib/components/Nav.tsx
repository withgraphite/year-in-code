'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import GraphiteCTA from './GraphiteCTA'

export default function Nav() {
	const pathname = usePathname()
	if (pathname === '/loading') return

	return (
		<nav className='absolute top-0 z-50 flex w-full flex-col items-center justify-center gap-3 p-5'>
			<GraphiteCTA />
			{pathname !== '/' && (
				<div className='flex w-full max-w-3xl items-center justify-center'>
					<Link
						className='border-r border-black px-3 text-xl no-underline'
						href='/'>
						Year in Code
					</Link>
					<p></p>
					{pathname !== '/leaderboard' && (
						<Link
							className='px-3 text-xl no-underline'
							href='/leaderboard'>
							Leaderboard
						</Link>
					)}
				</div>
			)}
		</nav>
	)
}
