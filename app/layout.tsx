import BackgroundGrid from 'lib/components/BackgroundGrid'
import localFont from 'next/font/local'
import {Toaster} from 'sonner'
import './styles.css'

// const font = Plus_Jakarta_Sans({subsets: ['latin']})

const font = localFont({
	src: [
		{
			path: '../lib/fonts/MatterSQ-Regular.otf',
			style: 'normal'
		}
	]
})

export const metadata = {
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-US'
		}
	}
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body
				className={`${font.className} relative flex h-full min-h-screen w-full flex-col items-center bg-white dark:bg-black`}>
				<BackgroundGrid className='fixed h-full w-full opacity-30 dark:opacity-40' />
				<Toaster />
				<div className='z-10 flex w-full max-w-3xl items-center justify-center'>
					{children}
				</div>
			</body>
		</html>
	)
}
