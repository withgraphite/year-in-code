'use client'
import {track} from '@vercel/analytics/react'
import clsx from 'clsx'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import {META} from '~/constants/metadata'
import {TRACKING} from '~/constants/tracking'
import {SessionContext} from '~/context/session'
import Footer from './Footer'

export default function Nav() {
	const {session} = useContext(SessionContext)

	const ref = useRef(null)
	const pathname = usePathname()
	const commonClassNames = 'px-5 py-1 no-underline '
	const activeClassNames = 'text-black'
	const [clipPath, setClipPath] = useState({
		left: '0%',
		right: '100%'
	})

	const links = useMemo(() => {
		const arr = [
			{
				href: session ? '/home' : '/',
				hrefs: ['/home', '/'],
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

		if (session)
			arr.splice(2, 0, {
				href: '/user/' + session.user.user_metadata.user_name,
				label: 'Profile'
			})

		return arr
	}, [session])

	const setActivePath = useCallback(
		p => {
			if (ref.current) {
				let left = '0%',
					right = '100%'
				const idx = links.findIndex(elem => {
					if (elem.hrefs?.length) return elem.hrefs.includes(p)

					return elem.href === p
				})
				if (idx > -1) {
					const {offsetLeft, offsetWidth} = ref.current.childNodes[idx]
					const {offsetWidth: containerWidth} = ref.current

					left = offsetLeft + 'px'
					right = (containerWidth - (offsetLeft + offsetWidth)).toFixed() + 'px'
				}

				setClipPath({
					left,
					right
				})
			}
		},
		[session, links.length, pathname]
	)

	useEffect(() => {
		setActivePath(pathname)
	}, [pathname, session, links.length])

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
			<nav className='pointer-events-none fixed left-0 top-0 z-50 flex w-full items-center justify-between p-8 '>
				<div className='headline pointer-events-auto flex w-fit items-center text-sm font-bold sm:text-lg'>
					2024 Year in code
				</div>

				<div className='pointer-events-auto relative overflow-hidden rounded-sm border border-neutral-700 bg-black/80 text-xs sm:text-sm'>
					<div
						className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white transition-[clip-path]'
						style={{
							clipPath: `inset(0 ${clipPath.right} 0 ${clipPath.left})`
						}}
					/>
					<div
						className='relative z-10 flex w-full items-center'
						ref={ref}>
						{links.map((link, i) => {
							return (
								<Link
									key={i}
									className={clsx(
										commonClassNames,
										pathname === link.href && activeClassNames,
										link.hideOnMobile && 'hidden sm:flex',
										i > 0 && 'border-l border-neutral-700'
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
