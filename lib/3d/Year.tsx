import {Instance, Instances} from '@react-three/drei'
import {useThree} from '@react-three/fiber'
import {useEffect, useMemo} from 'react'
import {CanvasTexture, Vector2} from 'three'

export const Year = () => {
	const count = 100
	const {size, viewport} = useThree()

	const positions = useMemo(() => {
		const temp = []
		for (let i = 0; i < count; i++) {
			const x = (Math.random() - 0.5) * 10
			const y = (Math.random() - 0.5) * 10

			// temp.push(x, y, z)
			temp.push(new Vector2(x, y))
		}
		// return new Float32Array(temp)

		return temp
	}, [])

	const canvasTexture = useMemo(() => {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		canvas.width = size.width
		canvas.height = size.height

		// Draw black background
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Draw text
		ctx.fillStyle = 'white'
		ctx.font = 'bold 420px Arial'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText('2024', canvas.width / 2, canvas.height / 2)

		// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		// const points = []

		// for (let i = 0; i < count; i++) {
		//     let x, y
		//     do {
		//         x = Math.floor(Math.random() * canvas.width)
		//         y = Math.floor(Math.random() * canvas.height)
		//     } while (imageData.data[(y * canvas.width + x) * 4] === 0) // Keep trying until we hit a white pixel

		//     // Convert to normalized coordinates (-5 to 5 range)
		//     const normalizedX = (x / canvas.width - 0.5) * 10
		//     const normalizedY = (y / canvas.height - 0.5) * -10 // Flip Y axis

		//     points.push(new Vector2(normalizedX, normalizedY))
		// }

		// return points

		return new CanvasTexture(canvas)
	}, [size, viewport])

	useEffect(() => {}, [])

	return (
		<>
			<mesh position-z={0.1}>
				<planeGeometry args={[10, 10, 10]} />
				<meshBasicMaterial map={canvasTexture} />
			</mesh>
			<Instances
				// ref={ref}
				limit={20}>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color='green' />
				{positions.map((p, i) => {
					return (
						<Instance
							key={i}
							position={[p.x, p.y, 0]}
							// foo={10}
						/>
					)
				})}
			</Instances>
		</>
	)
}
