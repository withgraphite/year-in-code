import Link from 'next/link'
import {ThemeSwitcher} from '~/components/ThemeSwitcher'

export default function Nav({title}: {title: string}) {
	return (
		<div className='fixed top-0 z-20 flex w-full items-baseline justify-around p-5'>
			<div className='flex flex-col'>
				<Link
					className='text-xl font-bold no-underline'
					href='/'>
					{title}
				</Link>
			</div>
			<div>
				<ThemeSwitcher />
			</div>
		</div>
	)
}
