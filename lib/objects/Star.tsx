import {useLoader} from '@react-three/fiber'
import {Color, TextureLoader} from 'three'
import Lighting from './../effects/Lighting'

export default function Star({tick, planet}: {tick: number; planet: 'sun'}) {
	const texture = useLoader(
		TextureLoader,
		`assets/${planet}.jpg`
	) as THREE.Texture

	return (
		<>
			<mesh rotation={[0, tick * 0.06 * 0.06 - 0.5, 0]}>
				<sphereGeometry args={[100, 40, 40]} />
				<meshStandardMaterial
					map={texture}
					emissive={new Color('orange')}
					emissiveIntensity={0.5}
				/>
			</mesh>
			<Lighting
				ambient={{
					intensity: 5
				}}
			/>
		</>
	)
}
