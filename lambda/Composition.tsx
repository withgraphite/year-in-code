'use client'
import 'devicon'
import {useCallback, useEffect, useState} from 'react'
import {
	Composition as RemotionComposition,
	continueRender,
	delayRender
} from 'remotion'
import '../app/styles.css'
import Video from '../lib/components/Video'
import {Stats} from '../lib/types/github'
import {Manifest} from '../lib/types/video'
import {COMPOSITION_NAME} from './config'

export default function Composition() {
	const [handle] = useState(() => delayRender())

	const delay = useCallback(async () => {
		// wait 1 second with timeout
		await new Promise(resolve => setTimeout(resolve, 1000))

		continueRender(handle)
	}, [])

	useEffect(() => {
		delay()
	}, [])

	return (
		<RemotionComposition
			id={COMPOSITION_NAME}
			component={Video}
			durationInFrames={12 * 30 * 5}
			fps={30}
			height={720}
			width={1280}
			defaultProps={{
				video: {} as Manifest,
				stats: {} as Stats
			}}
		/>
	)
}
