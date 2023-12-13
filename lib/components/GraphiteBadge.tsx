import Link from 'next/link'
import {META} from '~/constants/metadata'
import GraphiteIcon from './GraphiteIcon'

export default function GraphiteBadge() {
	return (
		<Link
			href={META.domain.web}
			className='absolute -left-7'>
			<GraphiteIcon className='smooth-stop h-6 w-6 animate-spin-slow hover:animate-none' />
		</Link>
	)
}
