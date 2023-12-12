import Link from 'next/link'
import {DOMAIN} from '~/constants/metadata'
import GraphiteIcon from './GraphiteIcon'

export default function GraphiteBadge() {
	return (
		<Link
			href={DOMAIN.GRAPHITE}
			className='absolute -left-7'>
			<GraphiteIcon className='animate-spin-slow smooth-stop h-6 w-6 hover:animate-none' />
		</Link>
	)
}
