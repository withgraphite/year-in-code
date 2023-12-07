import {Sequence, useCurrentFrame} from 'remotion'

export default function Conclusion({text, from}: {text: string; from: number}) {
	const frame = useCurrentFrame() - from
	return (
		<Sequence
			from={from}
			durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full flex-col items-center justify-center gap-5 bg-black'>
				<div className='absolute flex h-full w-full flex-col items-center justify-center gap-10 bg-black bg-gradient-to-tl from-blue-900 to-transparent'>
					{/* gradient */}
					<div
						className={`fixed h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700 to-transparent opacity-75 blur-xl`}
						style={{top: `${frame * 2 - 400}px`, right: `${frame * 2}px`}}
					/>
					<div
						className={`fixed h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700 to-transparent opacity-75 blur-xl`}
						style={{top: `${frame * 2}px`, left: `${100 + frame * 2}px`}}
					/>
				</div>
				<h2 className='z-10 mx-48 text-center text-white'>{text}</h2>
			</div>
		</Sequence>
	)
}
