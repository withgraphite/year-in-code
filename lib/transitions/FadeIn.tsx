export default function FadeIn({
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
				opacity: Math.min(
					1,
					frame < delay ? 0 : frame / duration - delay / duration
				)
			}}>
			{children}
		</div>
	)
}
