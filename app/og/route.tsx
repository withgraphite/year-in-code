import {ImageResponse} from 'next/og'
import {NextRequest} from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
	const {searchParams} = req.nextUrl
	const postTitle = searchParams.get('title')
	const font = fetch(
		new URL('../../public/fonts/MatterSQ-Regular.otf', import.meta.url)
	).then(res => res.arrayBuffer())
	const fontData = await font
	const size = {
		width: 1920,
		height: 1080
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
					backgroundImage:
						'url(https://graphite-wrapped.vercel.app/images/og-bg-text.png)'
				}}>
				{/* <BackgroundGrid
					style={{
						position: 'absolute',
						width: size.width,
						height: size.height,
						zIndex: -1
					}}
				/> */}
				<div
					style={{
						marginLeft: 190,
						marginRight: 190,
						display: 'flex',
						fontSize: 130,
						fontFamily: 'MatterSQ',
						letterSpacing: '-0.05em',
						fontStyle: 'normal',
						color: 'black',
						lineHeight: '120px',
						whiteSpace: 'pre-wrap'
					}}>
					{postTitle}
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'MatterSQ',
					data: fontData,
					style: 'normal'
				}
			]
		}
	)
}
