'use client'

import {useFrame, useThree} from '@react-three/fiber'
import {useEffect, useMemo, useRef} from 'react'
import {
	BufferAttribute,
	BufferGeometry,
	HalfFloatType,
	LinearFilter,
	Mesh,
	OrthographicCamera,
	RGBAFormat,
	ShaderMaterial,
	Vector2,
	WebGLRenderTarget
} from 'three'
import {GLOBAL_UNIFORMS} from './Background'

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D tMap;
  uniform float uFalloff;
  uniform vec2 uMouse;
  uniform vec2 uLast;
  uniform vec2 uVelocity;
  uniform float uAspect;
  uniform float uDissipation;
  
  varying vec2 vUv;
  
  void main() {
    vec4 color = texture2D(tMap, vUv) * uDissipation;

    vec2 cursor = vUv - uMouse;
    cursor.x *= uAspect;

    vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
    float falloff = smoothstep(uFalloff, 0.0, length(cursor));

    color.rgb = mix(color.rgb, stamp, vec3(falloff));
    // color.rgb = vec3(falloff);
    // color.rgb = stamp;

    // color.rgb = vec3(uVelocity, 0.);


    gl_FragColor = color;
  }
`

class FlowmapMaterial extends ShaderMaterial {
	constructor() {
		super({
			uniforms: {
				tMap: {value: null},
				uFalloff: {value: 0.2},
				uDissipation: {value: 0.98},
				uMouse: {value: new Vector2()},
				uLast: {value: new Vector2()},
				uVelocity: {value: new Vector2()},
				uAspect: {value: 1}
			},

			vertexShader,
			fragmentShader
		})
	}
}

export interface FlowmapProps {
	size?: number
	decayFactor?: number
}

export const FLOWMAP_UNIFORMS = {
	tMap: {
		value: null
	},
	uVelocity: {
		value: new Vector2()
	}
}

export const Flowmap = ({size = 256}: FlowmapProps) => {
	const {gl} = useThree()

	const config = {
		format: RGBAFormat,
		// minFilter: NearestFilter,
		minFilter: LinearFilter,
		magFilter: LinearFilter,

		depthBuffer: false,
		// internalFormat: RGBAFormat,
		// internalFormat: 'RGBA16F'

		type: HalfFloatType
	}

	const rt1Ref = useRef<WebGLRenderTarget>(
		new WebGLRenderTarget(size, size, {
			...config
		})
	)
	const rt2Ref = useRef<WebGLRenderTarget>(
		new WebGLRenderTarget(size, size, {
			...config
		})
	)
	const shouldWriteToFirstRT = useRef(true)

	const geometry = useMemo(() => {
		const geometry = new BufferGeometry()
		const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])
		const uvs = new Float32Array([0, 0, 2, 0, 0, 2])

		geometry.setAttribute('position', new BufferAttribute(vertices, 3))
		geometry.setAttribute('uv', new BufferAttribute(uvs, 2))
		return geometry
	}, [])

	const camera = useMemo(() => new OrthographicCamera(-1, 1, 1, -1, 0, 1), [])

	const [mesh, material] = useMemo(() => {
		const material = new FlowmapMaterial()

		material.uniforms.tMap = FLOWMAP_UNIFORMS.tMap
		material.uniforms.uMouse = GLOBAL_UNIFORMS.uMouse
		material.uniforms.uLast = GLOBAL_UNIFORMS.uLastMouse
		material.uniforms.uVelocity = FLOWMAP_UNIFORMS.uVelocity
		material.uniforms.uAspect = GLOBAL_UNIFORMS.uAspect

		const mesh = new Mesh(geometry, material)
		return [mesh, material]
	}, [geometry])

	useEffect(() => {
		return () => {
			rt1Ref.current?.dispose()
			rt2Ref.current?.dispose()
		}
	}, [])

	useFrame(({clock}) => {
		material.uniforms.tMap.value = FLOWMAP_UNIFORMS.tMap.value
		const writeRT = shouldWriteToFirstRT.current ? rt1Ref.current : rt2Ref.current

		const currentRenderTarget = gl.getRenderTarget()
		gl.setRenderTarget(writeRT)
		gl.setClearColor(null)
		gl.render(mesh, camera)
		gl.setRenderTarget(currentRenderTarget)

		shouldWriteToFirstRT.current = !shouldWriteToFirstRT.current // swap
		FLOWMAP_UNIFORMS.tMap.value = writeRT.texture
		// FLOWMAP_UNIFORMS.uVelocity.value.lerp(
		// 	GLOBAL_UNIFORMS.uMouseVelocity.value,
		// 	GLOBAL_UNIFORMS.uMouseVelocity.value.length() ? 0.5 : 0.1
		// )

		// FLOWMAP_UNIFORMS.uVelocity.value.set(1, 1)

		FLOWMAP_UNIFORMS.uVelocity.value.copy(GLOBAL_UNIFORMS.uMouseVelocity.value)
	})

	return null
}

Flowmap.displayName = 'Flowmap'
