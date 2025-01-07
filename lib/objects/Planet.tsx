import {shaderMaterial} from '@react-three/drei'
import {extend, useLoader} from '@react-three/fiber'
import {TextureLoader, Vector3} from 'three'
import {SNOISE_3D} from '../3d/common'
import {getAssetUrl} from '../utils/url'

export const PLANET_CONFIG = {
	radius: 100,
	segments: 40
}

const PlanetMaterial = shaderMaterial(
	{tMap: null, toneMappingExposure: 0.5, uLightPos: null, uProgress: 0},
	`
		varying vec2 vUv;
		varying vec3 vNormal;
		varying vec3 vWorldPos;

		void main() {
			vUv = uv;
			vNormal = normalize(normal);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`,
	`

		varying vec2 vUv;
		varying vec3 vNormal;

		uniform sampler2D tMap;
		uniform vec3 uLightPos;
		uniform float uProgress;

		#include <tonemapping_pars_fragment>

		${SNOISE_3D}

		float grid(vec2 uv, float lineWidth) {
			vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv) - lineWidth;
			float line = min(grid.x, grid.y);

			return 1. - min(line, 1.);
		}

		

		void main() {
			float fresnel = 1.4 - dot(vNormal, vec3(0., 0., 1.));

			vec2 scaledUv = vUv * 24.;
			vec2 gridUv = floor(scaledUv);
			float line = grid(scaledUv, 2.) * .2;
		

			
			float n = abs(snoise(vec3(gridUv, 1.)));
			vec3 color = vec3(line * (.01 + fresnel)) + n * .08;



			if (uProgress > n) {
	
				color = texture2D(tMap, vUv).rgb;
	
				vec3 atmosphere = vec3(0.3, 0.6, 1.) * pow(fresnel, 5.);
				color += atmosphere * .2;
	
			}
				
			float diffuse = dot(normalize(uLightPos), vNormal);
			color *= diffuse;

		

			color = ACESFilmicToneMapping( color );
			gl_FragColor = vec4(color, 1.);

			
		}
  `
)

extend({PlanetMaterial})

declare module '@react-three/fiber' {
	interface ThreeElements {
		planetMaterial: JSX.IntrinsicElements['shaderMaterial']
	}
}

const UNIFORMS = {
	uLightPos: {value: new Vector3(0, 2, 4)}
}

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
	const texture = useLoader(TextureLoader, getAssetUrl(planet + '.jpg'))
	// tick [0, 119]

	const progress = Math.min(tick / 50, 1)

	UNIFORMS.uLightPos.value.x = (tick * -1) / 20

	return (
		<>
			<group
				scale={[1, 1, 1]}
				rotation={[0, tick * 0.06 * 0.05 - 0.5, 0]}>
				<mesh>
					<sphereGeometry
						args={[
							PLANET_CONFIG.radius,
							PLANET_CONFIG.segments,
							PLANET_CONFIG.segments
						]}
					/>
					<planetMaterial
						uniforms-tMap-value={texture}
						uniforms-uLightPos={UNIFORMS.uLightPos}
						uniforms-uProgress-value={progress}
					/>
				</mesh>
			</group>
		</>
	)
}
