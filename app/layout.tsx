import {Analytics} from '@vercel/analytics/react'
import {SpeedInsights} from '@vercel/speed-insights/next'
import 'devicon'
import {Metadata} from 'next'
import {Toaster} from 'sonner'

import {Background} from '~/3d/Background'
import Nav from '~/components/Nav'
import {DEFAULT_META} from '~/constants/metadata'
import './styles.css'

import {GeistMono} from 'geist/font/mono'
import {GeistSans} from 'geist/font/sans'
import AnimatedModal from '~/components/AnimatedModal'
import {SessionProvider} from '~/context/session'

export const metadata: Metadata = {
	...DEFAULT_META,
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-US'
		}
	}
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<body
				className={`relative flex h-full min-h-screen w-full flex-col items-center bg-white font-sans dark:bg-black`}>
				<SessionProvider>
					<Background />
					<Nav />
					<Toaster />

					<AnimatedModal>{children}</AnimatedModal>
					<Analytics />
					<SpeedInsights />
				</SessionProvider>
			</body>
		</html>
	)
}
