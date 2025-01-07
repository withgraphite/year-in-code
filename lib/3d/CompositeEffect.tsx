import {Effect} from 'postprocessing'
import {forwardRef, useMemo} from 'react'

const fragmentShader = `



uniform sampler2D map;

vec2 brownConradyDistortion(in vec2 uv, in float k1, in float k2)
{
  uv = uv * 2.0 - 1.0;
  float r2 = uv.x*uv.x + uv.y*uv.y;
  uv *= 1.0 + k1 * r2 + k2 * r2 * r2;
  
  uv = (uv * .5 + .5);	// restore -> [0:1]
  return uv;
}

vec3 chromaAB( sampler2D tex, vec2 uv, vec2 offset, float pct)
{
  vec2 uvR = uv * (1.0 + offset * 0.02 * pct), uvB = uv * (1.0 - offset * 0.02 * pct);
  
  vec3 c;
  c.r = texture2D(tex, uvR).r;
  c.g = texture2D(tex, uv).g;
  c.b = texture2D(tex, uvB).b;
  return c;

}

vec3 reinhard2(vec3 x) {
  const float L_white = 4.0;

  return (x * (1.0 + x / (L_white * L_white))) / (1.0 + x);
}


const float uK1 = -0.1;
const float uK2 = -0.03;
const float uRGBShift = 0.12;


void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

    vec2 distortedUv = brownConradyDistortion( uv, uK1, uK2 );
    vec3 color = chromaAB(map, distortedUv, vec2(uRGBShift), 1.5);

    // color = reinhard2(color);



	outputColor = vec4(color, 1.);
}


`

class CompositeEffectImpl extends Effect {
	constructor() {
		super('CompositeEffect', fragmentShader, {})
	}
}

// Effect component
export const CompositeEffect = forwardRef(({}, ref) => {
	const effect = useMemo(() => new CompositeEffectImpl(), [])
	return (
		<primitive
			ref={ref}
			object={effect}
			dispose={null}
		/>
	)
})

CompositeEffect.displayName = 'CompositeEffect'
