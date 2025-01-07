import {useLoader} from '@react-three/fiber'
import {BackSide, TextureLoader} from 'three'
import {getAssetUrl} from '../utils/url'

export default function Space({tick}: {tick: number}) {
	const textureSphereBg = useLoader(TextureLoader, getAssetUrl('sky.jpg'))
	return (
		<mesh
			scale={[150, 150, 150]}
			rotation={[0, tick * 0.02 * 0.05 - 0.5, 0]}>
			<sphereGeometry args={[4, 40, 40]} />
			<meshBasicMaterial
				map={textureSphereBg}
				side={BackSide}
			/>
		</mesh>
	)
}
