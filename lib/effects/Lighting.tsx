export default function Lighting({
	ambient,
	directional
}: {
	ambient?: {intensity: number}
	directional?: {
		intensity: number
		color?: string
		position: [number, number, number]
	}
}) {
	return (
		<>
			{ambient && <ambientLight intensity={ambient.intensity} />}
			{directional && (
				<directionalLight
					color={directional.color || 'white'}
					intensity={directional.intensity}
					castShadow={false}
					position={directional.position}
				/>
			)}
		</>
	)
}
