'use client'

import {Player as RemotionPlayer} from '@remotion/player'
import Video from './Video'

export default function Player({videoProps}) {
	return (
		<div className='mb-[40px] mt-[60px] overflow-hidden'>
			<RemotionPlayer
				component={Video}
				durationInFrames={200}
				fps={30}
				inputProps={videoProps}
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
