export default function FadeOut({
	children,
	frame,
	delay = 0,
	duration = 30
}: {
	children: React.ReactNode
	frame: number
	delay?: number
	duration?: number
}) {
	return (
		<div
			style={{
				opacity: frame >= delay + duration ? 0 : 1 - (frame - delay) / duration
			}}>
			{children}
		</div>
	)
}
