import {Effect} from 'postprocessing'
import {forwardRef, useMemo} from 'react'
import {Uniform} from 'three'

const fragmentShader = `

uniform float uStrength;


vec2 fisheye(vec2 uv) {
    vec2 centered = uv * 2.0 - 1.0;
    float r = length(centered);
    float theta = atan(centered.y, centered.x);
    float rd = r * (1.0 - uStrength * r * r);
    
    vec2 distorted = vec2(cos(theta), sin(theta)) * rd;
    return (distorted + 1.0) * 0.5;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 fisheyeUv = fisheye(uv);

	outputColor = texture2D(inputBuffer, fisheyeUv);
}
`

export const FISHEYE_UNIFORMS = {
	uStrength: {
		value: 0.1
	}
}

class FisheyeEffectImpl extends Effect {
	constructor() {
		super('FisheyeEffect', fragmentShader, {})

		this.uniforms.set('uStrength', FISHEYE_UNIFORMS.uStrength as Uniform)
	}
}

// Effect component
export const FisheyeEffect = forwardRef(({}, ref) => {
	const effect = useMemo(() => new FisheyeEffectImpl(), [])
	return (
		<primitive
			ref={ref}
			object={effect}
			dispose={null}
		/>
	)
})

FisheyeEffect.displayName = 'FisheyeEffect'
