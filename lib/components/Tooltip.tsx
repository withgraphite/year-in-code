import {ReactNode} from 'react'
import cn from '~/utils/cn'

export default function Tooltip({
	children,
	body,
	className,
	position = 'top'
}: {
	children: ReactNode
	body: ReactNode
	className?: string
	position?: 'top' | 'bottom'
}) {
	return (
		<div className={cn('z-1 group relative flex justify-center', className)}>
			{children}
			<span
				className={cn(
					'absolute mb-1 scale-0 whitespace-nowrap rounded-lg border border-neutral-700 bg-black px-2 py-1 text-center text-white transition-all group-hover:scale-100',
					position === 'top'
						? 'bottom-[100%] origin-bottom'
						: 'top-[100%] origin-top'
				)}>
				{body}
			</span>
		</div>
	)
}
