'use client'

import {Player as RemotionPlayer, RenderPlayPauseButton} from '@remotion/player'
import {PauseIcon, PlayIcon} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
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
	const [parentWidth, setParentWidth] = useState(0)

	useEffect(() => {
		const updateDimensions = () => {
			const parentDiv = document.getElementById('videoContainer')
			if (parentDiv) setParentWidth(parentDiv.offsetWidth)
		}

		// Update dimensions on initial render
		updateDimensions()

		// Update dimensions on window resize
		window.addEventListener('resize', updateDimensions)

		// Clean up the event listener
		return () => {
			window.removeEventListener('resize', updateDimensions)
		}
	}, [])

	const renderPlayPauseButton: RenderPlayPauseButton = useCallback(
		({playing}) => {
			if (playing) return <PauseIcon className='text-white' />
			return <PlayIcon className='text-white' />
		},
		[]
	)

	return (
		<RemotionPlayer
			style={{
				width: `calc(${parentWidth}px)`
			}}
			component={Video}
			durationInFrames={video.scenes.length * 30 * 5}
			fps={30}
			inputProps={{video, stats, isMobile}}
			compositionHeight={720}
			compositionWidth={1280}
			controls
			className='rounded-md'
			loop
			renderPlayPauseButton={renderPlayPauseButton}
		/>
	)
}
