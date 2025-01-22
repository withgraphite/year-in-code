import {ImageResponse} from 'next/og'
import {NextRequest} from 'next/server'
import {META} from '~/constants/metadata'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
	const {searchParams} = req.nextUrl
	const postTitle = searchParams.get('title')
	const font = fetch(
		new URL('../../public/fonts/GeistMono-Regular.otf', import.meta.url)
	).then(res => res.arrayBuffer())
	const fontData = await font
	const size = {
		width: 1200,
		height: 630
	}

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					overflowY: 'hidden',
					color: '#FFFFFF',
					backgroundImage: `url(${META.domain.prod}images/og-bg-text.jpg)`
				}}>
					<div
					style={{
						fontFamily: 'Geist Mono',
						display: 'flex',
						fontSize: 80,
						position: 'absolute',
						right: 133,
						bottom: 70,
						color: '#FFFFFF',
						whiteSpace: 'nowrap'
					}}>
					{postTitle}
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Geist Mono',
					data: fontData,
					style: 'normal'
				}
			]
		}
	)
}
