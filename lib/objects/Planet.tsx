import {useLoader} from '@react-three/fiber'
import {TextureLoader} from 'three'
import Lighting from '../effects/Lighting'
import env from '../env.mjs'

export default function Planet({
	planet,
	tick
}: {
	planet:
		| 'mars'
		| 'jupiter'
		| 'saturn'
		| 'mercury'
		| 'neptune'
		| 'uranus'
		| 'venus'
		| 'moon'
	tick: number
}) {
	const texture = useLoader(
		TextureLoader,
		`${env.NEXT_PUBLIC_WEBSITE ? '/' : 'public/'}assets/${planet}.jpg`
	)
	return (
		<>
			<mesh
				scale={[1, 1, 1]}
				rotation={[0, tick * 0.06 * 0.05 - 0.5, 0]}>
				<sphereGeometry args={[100, 40, 40]} />
				<meshStandardMaterial map={texture} />
			</mesh>
			<Lighting directional={{intensity: 1, position: [(tick * -1) / 30, 3, 3]}} />
		</>
	)
}
