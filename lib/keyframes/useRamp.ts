import {useMemo} from 'react'

export default function useRamp(
	startValue,
	endValue,
	totalFrames,
	currentFrame
) {
	const value = useMemo(() => {
		const delta = endValue - startValue
		const progress = Math.min(currentFrame / totalFrames, 1) // Ensure progress does not exceed 1
		return startValue + progress * delta
	}, [startValue, endValue, totalFrames, currentFrame])

	return value
}
