import {extend} from '@react-three/fiber'
import {Bloom, EffectComposer} from '@react-three/postprocessing'
import {useEffect, useRef} from 'react'
import {Color} from 'three'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'

extend({TextGeometry})

const GradientShaderMaterial = ({color1, color2}) => {
	const uniforms = {
		color1: {type: 'c', value: new Color(color1)},
		color2: {type: 'c', value: new Color(color2)}
	}

	const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `

	const fragmentShader = `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
    `

	return (
		<shaderMaterial
			uniforms={uniforms}
			vertexShader={vertexShader}
			fragmentShader={fragmentShader}
		/>
	)
}

export default function BigNumber({
	count,
	number
}: {
	count: number
	number: number
}) {
	const font = new FontLoader().parse(
		require('../../public/fonts/Matter SQ_Bold.json')
	)
	const mesh = useRef<any>()

	useEffect(() => {
		if (mesh.current) {
			const geometry = mesh.current.geometry
			geometry.computeBoundingBox()
			geometry.center() // This repositions the geometry
		}
	}, [count])

	return (
		<>
			<ambientLight intensity={0.05} />
			<directionalLight
				color={'white'}
				intensity={0.8}
				position={[5, 5, 5]}
			/>

			<mesh
				ref={mesh}
				position={[0, 0, 0]}
				rotation={[0, -0.5 + count * 0.07 * 0.05, 0]}
				scale={100}>
				{/* text geometry */}
				<textGeometry
					args={[
						number.toString(),
						{
							font,
							size: 3,
							height: 0.5,
							bevelEnabled: true,
							bevelThickness: 0.5,
							bevelSize: 0.1,
							bevelOffset: 0.01,
							bevelSegments: 5
						}
					]}
				/>
				<GradientShaderMaterial
					color1='pink'
					color2='purple'
				/>
			</mesh>
			<EffectComposer>
				<Bloom
					luminanceThreshold={0.3}
					luminanceSmoothing={0.9}
					height={300}
				/>
				{/* You can add more post-processing effects here if needed */}
			</EffectComposer>
		</>
	)
}
