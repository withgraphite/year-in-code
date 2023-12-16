import {ReactNode} from 'react'
import cn from '~/utils/cn'

export default function Tooltip({
	children,
	body,
	className
}: {
	children: ReactNode
	body: string
	className?: string
}) {
	return (
		<div className='group relative flex justify-center'>
			{children}
			<span
				className={cn(
					'absolute bottom-[100%] w-96 scale-0 rounded-xl px-2 py-1 text-center text-black transition-all delay-200 group-hover:scale-100',
					className
				)}>
				{body}
			</span>
		</div>
	)
}
