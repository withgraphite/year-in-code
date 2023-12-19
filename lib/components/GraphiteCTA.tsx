'use client'
import {track} from '@vercel/analytics'
import {ArrowUpRightIcon} from 'lucide-react'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import GraphiteIcon from '~/icons/GraphiteIcon'
import cn from '~/utils/cn'

export default function GraphiteCTA({
	className,
	showLogo,
	showArrow
}: {
	className?: string
	showLogo?: boolean
	showArrow?: boolean
}) {
	return (
		<Link
			href={META.domain.web}
			target='_blank'
			className='group flex items-center gap-0 no-underline'>
			{showLogo && <GraphiteIcon className='h-9 w-9 fill-black' />}
			<button
				className={cn(
					'border-none bg-transparent p-0 text-xl font-medium text-black hover:bg-transparent hover:text-black',
					className
				)}
				onClick={() => track('Visit Graphite')}>
				Graphite
			</button>
			{showArrow && (
				<ArrowUpRightIcon className='h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
			)}
		</Link>
	)
}
