import Link from 'next/link'
import {META} from '~/constants/metadata'

export default function Footer() {
	return (
		<footer className='absolute bottom-0 flex w-full items-center justify-center p-5 text-white'>
			<Link
				href={META.github}
				target='_blank'
				className='group border-r border-white pr-3 no-underline hover:underline'>
				<span className='text-lg font-thin'>See code</span>
			</Link>
			<Link
				href={META.blog}
				target='_blank'
				className='group relative flex items-center pl-3 no-underline hover:underline'>
				<span className='text-lg font-thin'>Learn more</span>
			</Link>
		</footer>
	)
}
