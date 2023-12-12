import {extend, useFrame, useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import * as THREE from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({EffectComposer, RenderPass, UnrealBloomPass})

export default function Glow({children, strength, radius, threshold}) {
	const composer = useRef<EffectComposer>()
	const {scene, gl, size, camera} = useThree()
	const bloomPass = useRef<UnrealBloomPass>()

	useEffect(() => {
		if (composer.current && bloomPass.current) {
			composer.current = new EffectComposer(gl)
			composer.current.addPass(new RenderPass(scene, camera))

			bloomPass.current = new UnrealBloomPass(
				new THREE.Vector2(size.width, size.height),
				strength,
				radius,
				threshold
			)
			composer.current.addPass(bloomPass.current)
		}
	}, [scene, gl, camera, size, strength, radius, threshold])

	useFrame(() => composer.current?.render(), 1)

	return <>{children}</>
}
