import {useMemo} from 'react'

import {
	ChartLine,
	Eye,
	FolderOpen,
	GitCommitHorizontal,
	GitPullRequest
} from 'lucide-react'
import {Stats} from '../types/github'

/**
 * Fetch and display the user's top highlights
 * @returns {element} div with text
 */
export default function Highlights({stats}: {stats: Stats}) {
	const other = useMemo(() => {
		const arr = [
			{
				label: 'Pull requests',

				icon: <GitPullRequest className='w-[16px]' />,
				value: stats.pulls
			},
			{
				label: 'Pull reviews',
				value: stats.reviews,
				icon: <Eye className='w-[16px]' />
			},
			{
				label: 'Commits',

				value: stats.commits,
				icon: <GitCommitHorizontal className='w-[16px]' />
			},
			{
				label: 'Repositories',

				value: stats.repos,
				icon: <FolderOpen className='w-[16px]' />
			}
		].sort((a, b) => b.value - a.value)

		return arr
	}, [stats])

	return (
		<div className='group relative grid grid-cols-2 gap-4 text-left'>
			<div className='rounded border border-gray-800 bg-[#0a0a0a] p-2'>
				<div className='label text-md flex items-center gap-2 text-gray-500'>
					<ChartLine className='w-[18px] text-green-500' />{' '}
					<div>Total Contributions</div>
				</div>
				<div className='relative text-center font-mono text-[72px] font-bold'>
					<div className=''>{stats.contributions}</div>
					<div
						className={`color-gradient absolute left-0 top-0 h-full w-full mix-blend-screen blur-[6px] `}>
						{stats.contributions}
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-2 rounded-lg  '>
				{other.map((d, i) => {
					return (
						<div
							key={i}
							className='flex flex-1 items-center justify-between gap-2 rounded border border-gray-800 bg-[#0a0a0a] px-2 text-gray-300'>
							<div className='flex items-center gap-2'>
								{d.icon}
								<span className='text-sm text-gray-500'>{d.label}</span>
							</div>
							<div className='font-mono font-bold text-gray-300'>{d.value}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
