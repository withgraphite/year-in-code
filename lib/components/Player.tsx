'use client'

import {Player as RemotionPlayer} from '@remotion/player'
import {Manifest} from '~/types/video'
import Video from './Video'

export default function Player({video}: {video: Manifest}) {
	return (
		<RemotionPlayer
			style={{
				width: 'calc(100vw - 10rem)',
				maxHeight: 'calc(100vh - 10rem)'
			}}
			component={Video}
			durationInFrames={video.scenes.length * 30 * 5}
			fps={30}
			inputProps={{video}}
			compositionHeight={720}
			compositionWidth={1280}
			className='w-full'
			controls
			loop
		/>
	)
}
