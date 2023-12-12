export default function FadeIn({
	children,
	frame,
	delay = 0
}: {
	children: React.ReactNode
	frame: number
	delay?: number
}) {
	return (
		<div
			style={{
				opacity: Math.min(1, frame < delay ? 0 : frame / 30 - delay / 30)
			}}>
			{children}
		</div>
	)
}
