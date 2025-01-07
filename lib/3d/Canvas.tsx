import {ThreeCanvas} from '@remotion/three'
import {useVideoConfig} from 'remotion'
import Effects from '../effects/Effects'
import Camera from './../camera/Camera'

export default function Canvas({
	children,
	camera,
	frame
}: {
	children?: React.ReactNode
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
						position={[0, 0, 400]}
						fov={50}
					/>
				)}
				{children}
				<Effects />
			</ThreeCanvas>
		</div>
	)
}
