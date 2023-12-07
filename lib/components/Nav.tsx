import Link from 'next/link'

export default function Nav() {
	return (
		<div className='fixed top-0 z-20 flex w-full items-baseline justify-around p-5'>
			<div className='flex flex-col'>
				<Link
					className='text-xl font-bold no-underline'
					href='/'>
					GitHub Wrapped
				</Link>
			</div>
		</div>
	)
}
