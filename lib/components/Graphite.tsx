import {ArrowUpRight} from 'lucide-react'
import Link from 'next/link'

export default function Graphite() {
	return (
		<Link
			href='https://graphite.dev'
			target='_blank'
			className='group flex items-center no-underline'>
			Graphite
			<ArrowUpRight className='transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
		</Link>
	)
}
