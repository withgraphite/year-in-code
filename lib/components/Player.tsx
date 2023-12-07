'use client'

import {Player as RemotionPlayer} from '@remotion/player'
import {Stats} from '~/types/github'
import {Manifest} from '~/types/video'
import Video from './Video'

export default function Player({
	video,
	stats
}: {
	video: Manifest
	stats: Stats
}) {
	return (
		<RemotionPlayer
			style={{
				width: 'calc(100vw - 10rem)',
				maxHeight: 'calc(100vh - 10rem)'
			}}
			component={Video}
			durationInFrames={video.scenes.length * 30 * 5}
			fps={30}
			inputProps={{video, stats}}
			compositionHeight={720}
			compositionWidth={1280}
			className='w-full'
			controls
			loop
		/>
	)
}
