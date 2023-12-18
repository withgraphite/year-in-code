import {ThreeCanvas} from '@remotion/three'
import {useVideoConfig} from 'remotion'
import Camera from './../camera/Camera'
import Grain from './../effects/Grain'

export default function Canvas({
	children,
	camera,
	frame
}: {
	children: React.ReactNode
	camera?: React.ReactNode
	frame: number
}) {
	const {width, height} = useVideoConfig()
	return (
		<div className='absolute h-full w-full'>
			<ThreeCanvas
				width={width}
				height={height}>
				{camera ?? (
					<Camera
						position={[0, 0, 300]}
						fov={50 + frame / 15}
					/>
				)}
				{children}
				<Grain />
			</ThreeCanvas>
		</div>
	)
}
