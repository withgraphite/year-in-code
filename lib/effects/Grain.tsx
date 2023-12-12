import {EffectComposer, Noise} from '@react-three/postprocessing'

export default function Grain() {
	return (
		<EffectComposer>
			<Noise premultiply />
		</EffectComposer>
	)
}
