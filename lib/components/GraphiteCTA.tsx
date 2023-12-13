import {ArrowUpRight} from 'lucide-react'
import Link from 'next/link'
import {META} from '~/constants/metadata'

export default function Graphite({className}: {className?: string}) {
	return (
		<Link
			href={META.domain.web}
			target='_blank'
			className={`${className} group flex items-center no-underline`}>
			Graphite
			<ArrowUpRight className='transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
		</Link>
	)
}
