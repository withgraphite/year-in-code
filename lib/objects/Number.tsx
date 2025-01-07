import {extend, useLoader} from '@react-three/fiber'
import {useMemo, useRef} from 'react'
import {Mesh, TextureLoader} from 'three'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {getAssetUrl} from '../utils/url'

const font = new FontLoader().parse(
	require('../../public/fonts/PxGrotesk.json')
)

// Extend with TextGeometry
extend({TextGeometry})

export default function Number({
	number,
	frame
}: {
	number: number
	frame: number
}) {
	const texture = useLoader(TextureLoader, getAssetUrl('matcap.png'))

	const meshRef = useRef<Mesh>()
	const geo = useMemo(() => {
		const g = new TextGeometry(number.toString(), {
			font,
			size: 10,
			height: 2,
			bevelEnabled: true,
			bevelThickness: 0.5,
			bevelSize: 0.4,
			bevelOffset: -0.1,
			bevelSegments: 3
		})

		g.computeBoundingBox()
		g.center()

		return g
	}, [number, font])

	return (
		<group
			position={[0, -30, 0]}
			rotation={[0, -0.75 + frame / 30 / 5, 0]}
			scale={[10, 10, 10]}>
			<mesh
				ref={meshRef}
				geometry={geo}>
				<meshMatcapMaterial
					matcap={texture}
					polygonOffset={true}
					polygonOffsetUnits={5}
					polygonOffsetFactor={1}
				/>
			</mesh>
			<lineSegments>
				<edgesGeometry args={[geo]} />
				<lineBasicMaterial
					color='white'
					transparent
					opacity={0.5}
				/>
			</lineSegments>
		</group>
	)
}
