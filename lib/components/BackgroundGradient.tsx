'use client'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

export default function BackgroundGradient() {
	const pathname = usePathname()

	if (['/', '/leaderboard'].includes(pathname))
		return (
			<div className='absolute z-[-2] h-screen w-screen'>
				<Image
					src='/images/background-desktop.jpg'
					fill
					priority
					alt='Gradient'
					style={{objectFit: 'cover', objectPosition: 'center'}}
				/>
			</div>
		)
}
