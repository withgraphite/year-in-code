import {Sequence} from 'remotion'

export default function Stars({text, stars}: {text: string; stars: number}) {
	return (
		<Sequence durationInFrames={30 * 5}>
			<div className='absolute flex h-full w-full items-center justify-center bg-black'>
				<code className='text-xs text-white'>{text}</code>
				{new Array(stars).fill(0).map((_, i) => (
					<div
						key={i}
						className='absolute'
						style={{
							top: Math.random() * 100 + '%',
							left: Math.random() * 100 + '%',
							width: Math.random() * 10 + 'px',
							height: Math.random() * 10 + 'px',
							borderRadius: '50%',
							backgroundColor: 'white'
						}}
					/>
				))}
			</div>
		</Sequence>
	)
}
