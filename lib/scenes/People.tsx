import Image from 'next/image'
import {useCurrentFrame} from 'remotion'
import Canvas from '~/3d/Canvas'
import Camera from '~/camera/Camera'
import Space from '~/environment/Space'

import Sequence from '~/video/Sequence'

export default function People({
	text,
	from,
	people
}: {
	text: string
	from: number
	people: string[]
}) {
	const frame = useCurrentFrame() - from
	return (
		<Sequence
			from={from}
			transitionIn='fade'
			transitionOut='warp'
			background={
				<Canvas
					frame={frame}
					camera={
						<Camera
							position={[0, 0, 400]}
							fov={50}
						/>
					}>
					<Space tick={frame} />
				</Canvas>
			}
			content={
				<>
					<h2>{text}</h2>
					<div className='flex gap-5'>
						{people.map((person, i) => (
							<div
								key={i}
								style={{opacity: frame > i * 30 ? frame / 30 - i : 0}}>
								<Image
									className='rounded-full'
									src={person}
									width={80}
									height={80}
									alt='person'
								/>
							</div>
						))}
					</div>
				</>
			}
		/>
	)
}
