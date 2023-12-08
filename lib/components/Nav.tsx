'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function Nav() {
	const pathname = usePathname()
	if (pathname !== '/')
		return (
			<nav className='absolute top-0 z-50 flex w-full items-baseline justify-around'>
				<div
					className={`flex w-full max-w-3xl items-center ${
						pathname === '/' ? 'justify-end' : 'justify-between'
					}  p-5`}>
					<Link
						className='text-xl font-bold no-underline'
						href='/'>
						Year in Code
					</Link>
					{pathname !== '/leaderboard' && (
						<Link
							className='no-underline'
							href='/leaderboard'>
							Leaderboard
						</Link>
					)}
				</div>
			</nav>
		)
}
