'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import GraphiteCTA from './GraphiteCTA'

export default function Nav() {
	const pathname = usePathname()
	return (
		<nav className='absolute top-0 z-50 flex w-full items-baseline justify-around p-5'>
			{pathname !== '/leaderboard' && <GraphiteCTA />}

			{pathname !== '/' && (
				<div
					className={`flex w-full max-w-3xl items-center ${
						pathname === '/' ? 'justify-end' : 'justify-between'
					}`}>
					<Link
						className='text-xl font-semibold no-underline'
						href='/'>
						Year in Code
					</Link>
					{pathname !== '/leaderboard' && (
						<Link
							className='text-xl no-underline'
							href='/leaderboard'>
							Leaderboard
						</Link>
					)}
				</div>
			)}
		</nav>
	)
}
