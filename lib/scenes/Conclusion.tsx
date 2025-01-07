import {useCurrentFrame} from 'remotion'
import Earth from '../objects/Earth'

export default function Conclusion({text, from}: {text: string; from: number}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: (
			<>
				<Earth
					tick={frame}
					rotation={frame}
				/>
			</>
		),
		camera: undefined,
		content: <h2 className='headline'>{text}</h2>
	}
}
