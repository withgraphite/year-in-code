'use client'
import {track} from '@vercel/analytics/react'
import clsx from 'clsx'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useRef, useState} from 'react'
import {META} from '~/constants/metadata'
import {TRACKING} from '~/constants/tracking'
import Footer from './Footer'

const LINKS = [
	{
		href: '/',
		label: 'Home'
	},
	{
		href: '/leaderboard',
		label: 'Leaderboard'
	},
	{
		target: '_blank',
		href: META.domain.web,
		label: 'Try Graphite',
		hideOnMobile: true,
		onClick: () => track(TRACKING.VISIT_GRAPHITE)
	}
]

export default function Nav() {
	const ref = useRef(null)
	const pathname = usePathname()
	const commonClassNames = 'px-5 py-1 no-underline '
	const activeClassNames = 'text-black'
	const [clipPath, setClipPath] = useState({
		left: '100',
		right: '0'
	})

	const setActivePath = useCallback(p => {
		if (ref.current) {
			let left = '100',
				right = '0'
			const idx = LINKS.findIndex(elem => elem.href === p)
			if (idx > -1) {
				const {offsetLeft, offsetWidth} = ref.current.childNodes[idx]
				const {offsetWidth: containerWidth} = ref.current

				left = ((offsetLeft * 100) / containerWidth).toFixed()
				right = (
					((containerWidth - (offsetLeft + offsetWidth)) * 100) /
					containerWidth
				).toFixed()
			}

			setClipPath({
				left,
				right
			})
		}
	}, [])

	useEffect(() => {
		setActivePath(pathname)
	}, [pathname])

	useEffect(() => {
		const handleResize = () => {
			setActivePath(pathname)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	if (pathname === '/loading') return // TODO: create a loading spinner around nav

	return (
		<>
			<nav className='pointer-events-none fixed left-0 top-0 z-50 flex w-full items-center justify-between p-8 text-sm'>
				<div className='headline pointer-events-auto flex w-fit items-center text-lg font-bold'>
					2024 Year in code
				</div>

				<div className='pointer-events-auto relative overflow-hidden rounded-sm border border-white/20 bg-black/80'>
					<div
						className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white transition-[clip-path]'
						style={{
							clipPath: `inset(0 ${clipPath.right}% 0 ${clipPath.left}%)`
						}}
					/>
					<div
						className='relative z-10 flex w-full items-center'
						ref={ref}>
						{LINKS.map((link, i) => {
							return (
								<Link
									key={i}
									className={clsx(
										commonClassNames,
										pathname === link.href && activeClassNames,
										link.hideOnMobile && 'hidden sm:flex',
										i > 0 && 'border-l border-white/20'
									)}
									href={link.href}
									onClick={link.onClick}
									target={link.target}>
									{' '}
									{link.label}
								</Link>
							)
						})}
					</div>
				</div>
			</nav>
			<Footer />
		</>
	)
}
