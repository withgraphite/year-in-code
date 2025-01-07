import {useFrame, useLoader} from '@react-three/fiber'
import {useRef} from 'react'
import {ShaderMaterial, TextureLoader} from 'three'
import Lighting from '../effects/Lighting'
import {getAssetUrl} from '../utils/url'
import {PLANET_CONFIG} from './Planet'

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormal;

void main() {
	vNormal = normalize(normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform sampler2D dayMap;
uniform sampler2D nightMap;
uniform float transitionPoint;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vec4 dayColor = texture2D(dayMap, vUv);
    vec4 nightColor = texture2D(nightMap, vUv);

    // Boost the brightness of the city lights
    float brightnessBoost = 1.2; // Increase to make lights brighter
    nightColor.rgb *= brightnessBoost; // Boosting the RGB channels

    // Optional: reduce the brightness of the darker parts
    float darknessThreshold = 0.5; // Adjust this threshold
    nightColor.rgb = mix(nightColor.rgb * 0.1, nightColor.rgb, smoothstep(0.0, darknessThreshold, nightColor.r));

    // Transition effect
    float alpha = smoothstep(0.0, 0.1, vUv.x - (1.0 - transitionPoint));

	vec4 color = mix(nightColor, dayColor, alpha);
	float fresnel = 1.4 - dot(vNormal, vec3(0., 0., 1.));
	vec3 atmosphere = vec3(0.3, 0.6, 1.) * pow(fresnel, 5.);

	color.rgb += atmosphere * .08;

    gl_FragColor = color;
}
`

export default function Earth({tick, rotation}) {
	const nightTexture = useLoader(TextureLoader, getAssetUrl('earth_night.jpg'))
	const dayTexture = useLoader(TextureLoader, getAssetUrl('earth_day.jpg'))
	const cloudTexture = useLoader(TextureLoader, getAssetUrl('earth_clouds.jpg'))
	const shaderMaterial = useRef(
		new ShaderMaterial({
			uniforms: {
				dayMap: {value: dayTexture},
				nightMap: {value: nightTexture},
				transitionPoint: {value: 1} // Start fully covered by night
			},
			vertexShader,
			fragmentShader,
			transparent: true
		})
	)

	// Update the transition point based on tick
	useFrame(() => {
		// Gradually move the transition point from right to left
		shaderMaterial.current.uniforms.transitionPoint.value =
			0.6 + (tick % 200) / 1000
	})

	return (
		<>
			{/* Earth Mesh with Shader Material */}

			<mesh rotation={[0, rotation * 0.06 * 0.06 - 0.5, 0]}>
				<sphereGeometry
					args={[
						PLANET_CONFIG.radius,
						PLANET_CONFIG.segments,
						PLANET_CONFIG.segments
					]}
				/>
				<primitive
					object={shaderMaterial.current}
					attach='material'
				/>
			</mesh>

			{/* Cloud Mesh */}
			<mesh
				scale={[1.01, 1.01, 1.01]}
				rotation={[0, rotation * 0.06 * 0.06 - 0.5, 0]}>
				<sphereGeometry
					args={[
						PLANET_CONFIG.radius + 2,
						PLANET_CONFIG.segments,
						PLANET_CONFIG.segments
					]}
				/>
				<meshPhongMaterial
					map={cloudTexture}
					transparent
					opacity={0.5}
				/>
			</mesh>

			<Lighting
				ambient={{intensity: 0.05}}
				directional={{
					color: 'white',
					intensity: 3,
					position: [80 * (tick / 30), 30, 1]
				}}
			/>
		</>
	)
}
