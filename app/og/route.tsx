import {ImageResponse} from 'next/og'
import {NextRequest} from 'next/server'
import {META} from '~/constants/metadata'


export const runtime = 'edge'


export async function GET(req: NextRequest) {
	const {searchParams} = req.nextUrl
	const postTitle = searchParams.get('title')
	

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
					backgroundSize: 'cover',
					display: 'flex',
			
					position: 'relative',
					overflow: 'hidden',
					color: '#FFFFFF',
					backgroundImage: `url(${META.domain.prod}images/og-bg-text.jpg)`
				}}>
				
				<div
					style={{
						
						position: 'absolute',
						bottom: 24,
						transform: 'translateX(-50%)',
						left: '50%',
						display: 'flex',
						fontWeight: 'bold',
						fontSize: 24,
						fontFamily: 'monospace',
						color: '#FFFFFF',
						whiteSpace: 'nowrap'
					}}>
					 {postTitle}
				</div>
			</div>
		),
		{
			...size,
		}
	)
}
