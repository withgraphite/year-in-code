'use client'
import {track} from '@vercel/analytics'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {META} from '~/constants/metadata'

export default function Footer() {
	const pathname = usePathname()
	if (pathname !== '/loading')
		return (
			<footer className='absolute bottom-0 flex w-full items-center justify-center p-5 text-white'>
				<Link
					href={META.github}
					target='_blank'
					className='group border-r border-white pr-3 no-underline'
					onClick={() => track('Visit GitHub')}>
					<span className='text-lg font-thin'>See code</span>
				</Link>
				<Link
					href={META.blog}
					target='_blank'
					className='group relative flex items-center pl-3 no-underline'
					onClick={() => track('Visit blog')}>
					<span className='text-lg font-thin'>Learn more</span>
				</Link>
			</footer>
		)
}
