'use client'
import Image from 'next/image'

export default function BackgroundGradient() {
	return (
		<div className='absolute z-[-2] h-screen w-screen'>
			<Image
				src='/images/bg.jpg'
				fill
				priority
				alt='Gradient'
				style={{objectFit: 'cover', objectPosition: 'center'}}
			/>
		</div>
	)
}
