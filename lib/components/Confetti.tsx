'use client'
import confetti from 'canvas-confetti'
import {useEffect} from 'react'

export default function Confetti() {
	useEffect(() => {
		confetti({
			particleCount: 150,
			spread: 180,
			origin: {y: 0.6}
		})
	}, [])

	return null
}
