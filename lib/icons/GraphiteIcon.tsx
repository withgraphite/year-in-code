import cn from '~/utils/cn'

export default function GraphiteIcon({className}: {className?: string}) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={cn('flex items-center justify-center', className)}
			viewBox='0 0 20 20'>
			<path
				className='flex'
				d='m11.7932,3.3079l-6.6921,1.7931-1.7932,6.6921,4.899,4.899,6.6921-1.7931,1.7932-6.6921-4.899-4.899Zm1.0936,11.6921h-5.7735l-2.8867-5,2.8867-5h5.7735l2.8867,5-2.8867,5Z'
			/>
			<polygon
				className='flex'
				points='13.3504 6.6496 8.7737 5.4232 5.4232 8.7737 6.6496 13.3504 11.2263 14.5768 14.5768 11.2263 13.3504 6.6496'
			/>
		</svg>
	)
}
