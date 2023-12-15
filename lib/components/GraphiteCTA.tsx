import Link from 'next/link'
import {META} from '~/constants/metadata'

export default function GraphiteCTA({className}: {className?: string}) {
	return (
		<Link
			href={META.domain.web}
			target='_blank'
			className={`${className} group flex items-center text-2xl no-underline`}>
			Graphite
		</Link>
	)
}
