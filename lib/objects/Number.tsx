import {extend, useLoader} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import {Mesh, TextureLoader} from 'three'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import env from '../env.mjs'

// Extend with TextGeometry
extend({TextGeometry})

export default function Number({
	number,
	frame
}: {
	number: number
	frame: number
}) {
	const font = new FontLoader().parse(
		require('../../public/fonts/Silkscreen.json')
	)
	const texture = useLoader(
		TextureLoader,
		`${env.NEXT_PUBLIC_WEBSITE ? '/' : 'public/'}assets/uranus.jpg`
	)
	const meshRef = useRef<Mesh>()

	useEffect(() => {
		if (meshRef.current) {
			const geometry = meshRef.current.geometry
			geometry.computeBoundingBox()
			geometry.center()
		}
	})

	return (
		<mesh
			ref={meshRef}
			rotation={[0, -0.75 + frame / 30 / 5, 0]}
			scale={[10, 10, 10]}>
			<textGeometry
				args={[
					number.toString(),
					{
						font,
						size: 10,
						height: 2,
						bevelEnabled: true,
						bevelThickness: 0.5,
						bevelSize: 0.2,
						bevelOffset: 0,
						bevelSegments: 5
					}
				]}
			/>
			<meshBasicMaterial map={texture} />
		</mesh>
	)
}
