import Link from 'next/link'
import {META} from '~/constants/metadata'
import GraphiteIcon from '../icons/GraphiteIcon'

export default function GraphiteBadge() {
	return (
		<Link
			href={META.domain.web}
			className='group flex items-center gap-0.5 rounded-full pr-2 text-black no-underline transition-colors duration-300 hover:bg-black hover:text-white hover:opacity-100'>
			<GraphiteIcon className='h-6 w-6 fill-black transition-colors duration-300 group-hover:fill-white' />
			<span className='text-sm font-thin opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
				Uses Graphite.dev
			</span>
		</Link>
	)
}
