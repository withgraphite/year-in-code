import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import 'devicon'
import BackgroundGrid from 'lib/components/BackgroundGrid'
import {Metadata} from 'next'
import localFont from 'next/font/local'
import {Toaster} from 'sonner'
import BackgroundGradient from '~/components/BackgroundGradient'
import Footer from '~/components/Footer'
import Nav from '~/components/Nav'
import {DEFAULT_META} from '~/constants/metadata'
import './styles.css'

const font = localFont({
	src: [
		{
			path: '../public/fonts/MatterSQ-Light.otf',
			weight: '100'
		},
		{
			path: '../public/fonts/MatterSQ-Regular.otf',
			weight: '400'
		},
		{
			path: '../public/fonts/MatterSQ-Bold.otf',
			weight: '700'
		}
	]
})

export const metadata: Metadata = {
	...DEFAULT_META,
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
				<BackgroundGrid className='fixed z-[-1] h-full w-full opacity-30 dark:opacity-40' />
				<BackgroundGradient />
				<Nav />
				<Toaster />
				<div className='flex w-full max-w-3xl items-center justify-center'>
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
				</div>
			</body>
		</html>
	)
}
