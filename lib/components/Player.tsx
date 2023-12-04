'use client'

import {Player as RemotionPlayer} from '@remotion/player'
import {Manifest} from '~/types/video'
import Video from './Video'

export default function Player({video}: {video: Manifest}) {
	return (
		<div className='mb-[40px] mt-[60px] overflow-hidden'>
			<RemotionPlayer
				component={Video}
				durationInFrames={video.scenes.length * 30 * 5}
				fps={30}
				inputProps={{video}}
				compositionHeight={720}
				compositionWidth={1280}
				className='w-full'
				controls
				autoPlay
				loop
			/>
		</div>
	)
}
