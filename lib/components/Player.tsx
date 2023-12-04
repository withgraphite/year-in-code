'use client'

import {Player as RemotionPlayer} from '@remotion/player'
import {Scenes} from '~/types/scene'
import Video from './Video'

export default function Player({scenes}: {scenes: Scenes}) {
	return (
		<div className='mb-[40px] mt-[60px] overflow-hidden'>
			<RemotionPlayer
				component={Video}
				durationInFrames={scenes.scenes.length * 30 * 3}
				fps={30}
				inputProps={{scenes}}
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
