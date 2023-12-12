export default function FadeOut({
	children,
	frame,
	delay = 0
}: {
	children: React.ReactNode
	frame: number
	delay: number
}) {
	return (
		<div
			style={{
				opacity: frame >= delay + 30 ? 0 : 1 - (frame - delay) / 30
			}}>
			{children}
		</div>
	)
}
