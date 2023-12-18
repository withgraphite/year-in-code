import {useCurrentFrame} from 'remotion'
import FastTravel from '../environment/FastTravel'

export default function Stars({text, from}: {text: string; from: number}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: (
			<FastTravel
				tick={frame}
				speed={1}
			/>
		),
		camera: undefined,
		content: <h2>{text}</h2>
	}
}
