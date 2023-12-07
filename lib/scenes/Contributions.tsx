import {Sequence} from 'remotion'
import ContributionGraph from '~/components/ContributionGraph'
import {Week} from '~/types/github'

export default function Contributions({
	text,
	from,
	weeks
}: {
	text: string
	from: number
	weeks: Week[]
}) {
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<h2 className='mx-48 text-center text-white'>{text}</h2>
				<ContributionGraph weeks={weeks} />
			</div>
		</Sequence>
	)
}
