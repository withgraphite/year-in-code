import Link from 'next/link'
import {META} from '~/constants/metadata'
import GraphiteIcon from './GraphiteIcon'

export default function GraphiteBadge() {
	return (
		<Link
			href={META.domain.web}
			className=''>
			<GraphiteIcon className='h-6 w-6' />
		</Link>
	)
}
