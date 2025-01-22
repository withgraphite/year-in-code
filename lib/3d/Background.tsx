'use client'

import {shaderMaterial} from '@react-three/drei'
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber'
import {Bloom, EffectComposer} from '@react-three/postprocessing'
import {usePathname} from 'next/navigation'
import {CSSProperties, useCallback, useEffect, useMemo, useState} from 'react'
import {
	BufferAttribute,
	BufferGeometry,
	MathUtils,
	Sphere,
	Vector2,
	Vector3
} from 'three'
import {FISHEYE_UNIFORMS, FisheyeEffect} from './FisheyeEffect'
import {FLOWMAP_UNIFORMS, Flowmap} from './Flowmap'
import {SNOISE_3D} from './common'

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
`

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uCellSize;
uniform vec2 uResolution;
uniform sampler2D tFlow;
uniform float uFade;

uniform sampler2D tFont;



varying vec2 vUv;

${SNOISE_3D}

float random(vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233))) * 43758.5453123);
}

float grid(vec2 uv, float lineWidth) {
	vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv) - lineWidth;
	float line = min(grid.x, grid.y);

	return min(line, 1.);
}

void main() {
	vec2 flow = texture2D(tFlow, vUv).xy;

	// UV
	vec2 fragCoords = (vUv + flow * .01) * uResolution; // pixel frag coord of uv

    vec2 localUv = mod(fragCoords, uCellSize) / uCellSize;
    vec2 gridUv = floor(fragCoords / uCellSize) / uCellSize; // pixelated
	// vec2 gridUv2 = floor(vUv * uResolution / uCellSize) / uCellSize; // pixelated


	float brightness = abs(snoise(vec3(gridUv.x * 20., gridUv.y * 15., uTime * .4)));
	brightness = pow(brightness, 3.) * .02;



	vec3 color = vec3(brightness);

	// GRID
    vec2 scaledUv = fragCoords / uCellSize;    
	float line = grid(scaledUv, 0.75);
	vec3 gridColor = vec3(1. - line);


	float inCircle = abs(flow.x + flow.y / 2.);
	color += gridColor * (.002 + inCircle * .04);
	
	color.rgb *= (1. - uFade * .6);
    gl_FragColor = vec4(color, 1.);
}
`

export const GLOBAL_UNIFORMS = {
	uTime: {value: 0.0},
	uMouse: {value: new Vector2()},
	uLastMouse: {value: new Vector2()},

	uMouseVelocity: {value: new Vector2()},
	uFade: {value: 0},
	uFadeTarget: {value: 0},

	uAspect: {value: 1},
	uResolution: {value: new Vector2()},
	uCellSize: {value: 40}, // pixel units for cell size
	uMouseVelocityNeedsUpdate: false
}

const GLOBALS = {
	cameraRotationTarget: new Vector2(0, 0),
	distortion: new Vector2(0, 0)
}

const BackgroundMaterial = shaderMaterial(
	{
		tFont: undefined,
		uMouse: undefined,
		uTime: undefined,
		uResolution: undefined,
		uCellSize: undefined,
		tFlow: undefined
	},
	vertexShader,
	fragmentShader
)
extend({BackgroundMaterial})

declare module '@react-three/fiber' {
	interface ThreeElements {
		backgroundMaterial: JSX.IntrinsicElements['shaderMaterial']
	}
}

const BackgroundInner = () => {
	const {size, viewport, camera, clock} = useThree()

	useFrame(({clock}) => {
		const delta = clock.getDelta() * 100 // seconds
		GLOBAL_UNIFORMS.uTime.value += delta

		if (!GLOBAL_UNIFORMS.uMouseVelocityNeedsUpdate)
			GLOBAL_UNIFORMS.uMouseVelocity.value.set(0, 0)

		GLOBAL_UNIFORMS.uMouseVelocityNeedsUpdate = false

		camera.rotation.x = MathUtils.lerp(
			camera.rotation.x,
			GLOBALS.cameraRotationTarget.x,
			0.05
		)
		camera.rotation.y = MathUtils.lerp(
			camera.rotation.y,
			GLOBALS.cameraRotationTarget.y,
			0.05
		)

		GLOBAL_UNIFORMS.uFade.value = MathUtils.lerp(
			GLOBAL_UNIFORMS.uFade.value,
			GLOBAL_UNIFORMS.uFadeTarget.value,
			0.9
		)
	})

	useEffect(() => {
		GLOBAL_UNIFORMS.uResolution.value.set(size.width, size.height)
		GLOBAL_UNIFORMS.uAspect.value = size.width / size.height
	}, [size])

	const handleMouseMove = useCallback(
		e => {
			GLOBAL_UNIFORMS.uLastMouse.value.copy(GLOBAL_UNIFORMS.uMouse.value)

			const uvX = e.clientX / size.width
			const uvY = 1 - e.clientY / size.height

			// normalize to [-1, 1]
			const x = uvX * 2 - 1
			const y = uvY * 2 - 1

			// distortion, using a simpler function
			const distance = Math.sqrt(x * x + y * y)
			const distortionFactor =
				1 / (1 + FISHEYE_UNIFORMS.uStrength.value * distance)

			// Apply distortion and convert back to UV space (0 to 1)
			const distortedX = x * distortionFactor * 0.5 + 0.5
			const distortedY = y * distortionFactor * 0.5 + 0.5

			GLOBAL_UNIFORMS.uMouse.value.set(distortedX, distortedY)

			const delta = Math.max(0.02, clock.getDelta()) // TODO:

			GLOBAL_UNIFORMS.uMouseVelocity.value.set(
				(GLOBAL_UNIFORMS.uMouse.value.x - GLOBAL_UNIFORMS.uLastMouse.value.x) /
					delta,
				(GLOBAL_UNIFORMS.uMouse.value.y - GLOBAL_UNIFORMS.uLastMouse.value.y) /
					delta
			)

			GLOBAL_UNIFORMS.uMouseVelocityNeedsUpdate = true

			GLOBALS.cameraRotationTarget.set(y * 0.03, x * 0.02)
		},
		[size]
	)

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [handleMouseMove])

	const geometry = useMemo(() => {
		const g = new BufferGeometry()

		const xBound = viewport.width / 2
		const yBound = viewport.height / 2

		const vertices = new Float32Array([
			-xBound,
			-yBound,
			0,
			3 * xBound,
			-yBound,
			0,
			-xBound,
			3 * yBound,
			0
		])

		const uvs = new Float32Array([0, 0, 2, 0, 0, 2])

		g.boundingSphere = new Sphere()
		g.boundingSphere.set(new Vector3(), Infinity)

		g.setAttribute('position', new BufferAttribute(vertices, 3))
		g.setAttribute('uv', new BufferAttribute(uvs, 2))
		return g
	}, [viewport])

	return (
		<>
			<mesh
				frustumCulled={false}
				geometry={geometry}>
				<backgroundMaterial
					uniforms-uResolution={GLOBAL_UNIFORMS.uResolution}
					uniforms-uTime={GLOBAL_UNIFORMS.uTime}
					uniforms-uCellSize={GLOBAL_UNIFORMS.uCellSize}
					uniforms-uMouse={GLOBAL_UNIFORMS.uMouse}
					uniforms-tFlow={FLOWMAP_UNIFORMS.tMap}
					uniforms-uFade={GLOBAL_UNIFORMS.uFade}
				/>
			</mesh>
			{/* <Year /> */}
			<Flowmap />
		</>
	)
}

export const Background = () => {
	const pathname = usePathname()
	const [frameloop, setFrameloop] = useState<'always' | 'never' | 'demand'>(
		'always'
	)
	useEffect(() => {
		GLOBAL_UNIFORMS.uFadeTarget.value = pathname !== '/' ? 1 : 0.2

		setFrameloop(
			pathname !== '/' && pathname !== '/home' && pathname !== '/leaderboard' ? 'never' : 'always'
		)
	}, [pathname])

	return (
		<div className='fixed left-0 top-0 h-full w-full'>
			<Canvas
				camera={{
					near: 0.001,
					far: 1000
				}}
				style={
					{
						'--grid-color': 'rgba(255 255 255 / 5%)',
						'--grid-cell-size': '50px'
					} as CSSProperties
				}
				className='gridded bg-black'
				frameloop={frameloop}>
				<EffectComposer>
					<FisheyeEffect />
					<Bloom />
				</EffectComposer>
				<BackgroundInner />
			</Canvas>
		</div>
	)
}
