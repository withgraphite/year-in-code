import {useThree} from '@react-three/fiber'
import {useEffect} from 'react'
import {PerspectiveCamera} from 'three'

const Camera = ({
	position,
	fov
}: {
	position?: [number, number, number]
	fov?: number
}) => {
	const {camera} = useThree()

	useEffect(() => {
		// Set FOV
		if (fov) {
			;(camera as PerspectiveCamera).fov = fov
			camera.updateProjectionMatrix() // Important after changing FOV
		}

		// Set position
		if (position) camera.position.set(position[0], position[1], position[2])
	}, [position, fov, camera])

	return null // This component does not render anything itself
}

export default Camera
