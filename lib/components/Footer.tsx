'use client'
import {track} from '@vercel/analytics'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {META} from '~/constants/metadata'
import SignOutButton from './SignOutButton'
import {IconLinkedIn} from './icons/LinkedIn'
import {IconTwitter} from './icons/Twitter'

const Socials = () => {
	const commonClassName = 'hover:text-white'
	return (
		<div className='pointer-events-auto flex gap-2'>
			<Link
				href='https://www.linkedin.com/company/withgraphite'
				className={commonClassName}>
				<IconLinkedIn />
			</Link>
			<Link
				href='https://x.com/withgraphite/'
				className={commonClassName}>
				<IconTwitter />
			</Link>
		</div>
	)
}

export default function Footer() {
	const pathname = usePathname()

	let inner
	if (pathname === '/loading')
		inner = (
			<SignOutButton
				className='pointer-events-auto text-white'
				expand
			/>
		)
	else
		inner = (
			<>
				<Socials />
				<div className='pointer-events-auto flex gap-2'>
					<Link
						href={META.github}
						target='_blank'
						className='group no-underline hover:text-white'
						onClick={() => track('Visit GitHub')}>
						See code
					</Link>
				</div>
			</>
		)

	return (
		<footer className='pointer-events-none fixed bottom-0 z-10 flex w-full items-center justify-between p-8 text-xs sm:text-sm text-white/50 '>
			{inner}
		</footer>
	)
}
