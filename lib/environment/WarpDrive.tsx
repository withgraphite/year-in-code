import {useLoader} from '@react-three/fiber'
import {useMemo, useRef} from 'react'
import * as THREE from 'three'
import {getAssetUrl} from '../utils/url'

const fragmentShader = `
	varying vec2 vUv;
	uniform sampler2D tMap;
	uniform vec2 uOffset;
	uniform float uProgress;

	const float uContrast = 1.025;

	#include <tonemapping_pars_fragment>


	void main() {
		vec2 offsetUv = vUv + uOffset;

		vec3 color = texture2D(tMap, offsetUv).rgb;

		color = ((color - .5) * max(uContrast, 0.)) + 0.5;
		color = ACESFilmicToneMapping( color );

		float brightness = (color.r + color.g + color.b) * .33;
		color = mix(color, vec3(0.), step(uProgress, brightness));
		
		gl_FragColor = vec4(color, 1.);
		
	}

`

const vertexShader = `
	varying vec2 vUv;

	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
	}
`

const UNIFORMS = {
	offset: {
		value: new THREE.Vector2(0, 0)
	},
	progress: {
		value: 0
	}
}

export default function WormHole({tick, speed}: {tick: number; speed: number}) {
	// tick is [30, 150]
	UNIFORMS.progress.value = Math.max(0, 1 - Math.abs(tick - 90) / 60)

	const texture = useLoader(THREE.TextureLoader, getAssetUrl('galaxy.jpg'))
	const meshRef = useRef()

	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping

	const tubeGeometry = useMemo(() => {
		const points = []
		for (let i = 0; i < 5; i++)
			points.push(new THREE.Vector3(0, 0, 3 * (i / 4.4)))

		points[4].y = -0.15

		const curve = new THREE.CatmullRomCurve3(points)
		return new THREE.TubeGeometry(curve, 32, 0.01, 36, false)
	}, [])

	UNIFORMS.offset.value.set(-tick / (speed * 400), tick / 400)

	// texture.offset.x = -tick / (speed * 400)

	// texture.offset.y = tick / 400

	return (
		<mesh
			scale={[100, 100, 200]}
			ref={meshRef}
			geometry={tubeGeometry}>
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					tMap: {
						value: texture
					},
					uOffset: UNIFORMS.offset,
					uProgress: UNIFORMS.progress,
					toneMappingExposure: {value: 0.5}
				}}
				side={THREE.BackSide}
			/>
		</mesh>
	)
}
