import cn from '~/utils/cn'

export default function RubricIcon({className}: {className?: string}) {
	return (
		<svg
			viewBox='0 0 900 900'
			className={cn('h-full w-full fill-none', className)}
			xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M300 600V300H400V400H500V300H600V400H500V500H400V600H300Z'
				fill='white'
			/>
		</svg>
	)
}
