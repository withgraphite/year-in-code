import Link from 'next/link'
import {META} from '~/constants/metadata'
import cn from '~/utils/cn'

export default function GraphiteCTA({className}: {className?: string}) {
	return (
		<Link
			href={META.domain.web}
			target='_blank'
			className={cn(
				'group flex items-center text-2xl font-semibold no-underline',
				className
			)}>
			Graphite
		</Link>
	)
}
