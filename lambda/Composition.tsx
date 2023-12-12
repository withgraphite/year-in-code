'use client'

import {Composition as RemotionComposition} from 'remotion'
import Video from './../lib/components/Video'

export default function Composition() {
	return (
		<RemotionComposition
			id={'wrapped'}
			component={Video}
			durationInFrames={12 * 30 * 5}
			fps={30}
			height={720}
			width={1280}
			defaultProps={{
				video: {},
				stats: {
					username: '',
					year: 2023
				}
			}}
		/>
	)
}
