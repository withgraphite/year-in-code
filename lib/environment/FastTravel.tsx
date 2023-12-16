import {useLoader} from '@react-three/fiber'
import {useMemo, useRef} from 'react'
import * as THREE from 'three'
import env from '../env.mjs'

export default function FastTravel({
	tick,
	speed
}: {
	tick: number
	speed: number
}) {
	const texture = useLoader(
		THREE.TextureLoader,
		`${env.NEXT_PUBLIC_WEBSITE ? '/' : 'public/'}assets/sky.jpg`
	)
	const meshRef = useRef()

	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping

	const tubeGeometry = useMemo(() => {
		const points = []
		for (let i = 0; i < 5; i++)
			points.push(new THREE.Vector3(0, 0, 3 * (i / 4.4)))

		points[4].y = -0.15

		const curve = new THREE.CatmullRomCurve3(points)
		return new THREE.TubeGeometry(curve, 70, 0.01, 100, false)
	}, [])

	texture.offset.x = (-tick / 500) * speed

	texture.offset.y = tick / 500

	return (
		<mesh
			scale={[100, 100, 200]}
			ref={meshRef}
			geometry={tubeGeometry}>
			<meshBasicMaterial
				attach='material'
				side={THREE.BackSide}
				map={texture}
			/>
		</mesh>
	)
}
