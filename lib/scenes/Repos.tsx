import clsx from 'clsx'
import {useCurrentFrame} from 'remotion'

export const Folder = ({className, ...props}: {className?: string}) => {
	return (
		<svg
			viewBox='0 0 92 84'
			fill='none'
			className={clsx(className)}
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M6 0C2.71006 0 0 2.71006 0 6V24V28V78C0 81.2899 2.71006 84 6 84H86C89.2899 84 92 81.2899 92 78V30V24V14C92 10.7101 89.2899 8 86 8H32C32.1731 8 31.938 8.00073 31.4492 7.4375C30.9605 6.87427 30.3588 5.93988 29.7305 4.9375C29.1021 3.93512 28.4436 2.86558 27.6133 1.92578C26.783 0.985983 25.6375 0 24 0H6ZM6 4H24C23.8785 4 24.1223 4.01402 24.6172 4.57422C25.1121 5.13442 25.7145 6.06488 26.3398 7.0625C26.9652 8.06012 27.6129 9.12573 28.4258 10.0625C29.2387 10.9993 30.3579 12 32 12H86C87.1301 12 88 12.8699 88 14V18.375C87.3702 18.1479 86.7037 18 86 18H6C5.29632 18 4.62978 18.1479 4 18.375V6C4 4.86994 4.86994 4 6 4ZM6 22H86C87.1301 22 88 22.8699 88 24V30V78C88 79.1301 87.1301 80 86 80H6C4.86994 80 4 79.1301 4 78V28V24C4 22.8699 4.86994 22 6 22Z'
				className='fill-white/60'
			/>
		</svg>
	)
}

const Repo = ({children, style}) => {
	return (
		<div
			className='grow-1 relative flex shrink-0 flex-col items-center gap-4'
			style={style}>
			<div className='relative h-[60px] w-[60px]'>
				<Folder className='absolute left-0 top-0 h-[60px] h-full w-[60px] w-full blur-[10px]' />
				<Folder className='absolute left-0 top-0 h-[60px] h-full w-[60px] w-full' />
			</div>
			<div className='flex w-[150px] justify-center'>
				<div
					className='w-fit break-all text-pretty rounded border border-neutral-700 bg-black/80 px-2 py-1 font-mono text-lg text-white'
	
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default function Repos({
	from,
	text,
	repos
}: {
	from: number
	text: string
	repos: {name: string; color: string}[]
}) {
	const frame = useCurrentFrame() - from

	return {
		from,
		background: undefined,
		camera: undefined,
		content: (
			<>
				<h2 className='headline'>{text}</h2>
				<div className='flex gap-4'>
					{repos.map((repo, i) => (
						<Repo
							style={{
								opacity: frame > i * 30 ? frame / 30 - i : 0
							}}
							// color={repo.color}
							key={repo.name}>
							{repo.name}
						</Repo>
					))}
				</div>
			</>
		)
	}
}
