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
	if (pathname === '/loading')
		return (
			<footer className='absolute bottom-0 flex w-full items-center justify-center p-5 text-white'>
				<SignOutButton
					className='text-white'
					expand
				/>
			</footer>
		)
	return (
		<footer className='absolute bottom-0 flex w-full items-center justify-center p-5 text-white'>
			<Link
				href={META.github}
				target='_blank'
				className='group border-r border-white pr-3 no-underline'>
				<button
					className='border-none bg-transparent p-0 text-lg font-thin text-white hover:bg-transparent hover:text-white'
					onClick={() => track('Visit GitHub')}>
					See code
				</button>
			</Link>
			<Link
				href={META.blog}
				target='_blank'
				className='group relative flex items-center pl-3 no-underline'>
				<button
					onClick={() => track('Visit blog')}
					className='border-none bg-transparent p-0 text-lg font-thin text-white hover:bg-transparent hover:text-white'>
					Learn more
				</button>
			</Link>
		</footer>
	)
}
