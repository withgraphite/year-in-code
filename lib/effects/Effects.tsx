import {EffectComposer, Noise} from '@react-three/postprocessing'
import {CompositeEffect} from '../3d/CompositeEffect'

export default function Grain() {
	return (
		<EffectComposer>
			<CompositeEffect />
			{/* <Bloom /> */}
			<Noise premultiply />
		</EffectComposer>
	)
}
