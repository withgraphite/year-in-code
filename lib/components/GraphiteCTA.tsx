import {track} from '@vercel/analytics'
import {ArrowUpRightIcon} from 'lucide-react'
import Link from 'next/link'
import {META} from '~/constants/metadata'
import cn from '~/utils/cn'

export default function GraphiteCTA({
	className,
	showIcon
}: {
	className?: string
	showIcon?: boolean
}) {
	return (
		<Link
			href={META.domain.web}
			target='_blank'
			onClick={() => track('Visit Graphite website')}
			className={cn(
				'group flex items-center gap-1 text-xl font-medium no-underline',
				className
			)}>
			Graphite
			{showIcon && (
				<ArrowUpRightIcon className='h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
			)}
		</Link>
	)
}
