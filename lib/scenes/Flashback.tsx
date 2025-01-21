import {useCurrentFrame} from 'remotion'
import Camera from '../camera/Camera'
import FastTravel from '../environment/FastTravel'
import WormHole from '../environment/WarpDrive'
import FadeIn from '../transitions/FadeIn'

export default function Flashback({dateFrom, dateTo, text, from}) {
	const frame = useCurrentFrame() - from

	const secondsPerFrame =
		(new Date(dateFrom).getTime() - new Date(dateTo).getTime()) / 119

	const date =
		frame < 32
			? dateFrom
			: frame < 148
				? new Date(dateFrom).getTime() - (frame - 30) * secondsPerFrame
				: dateTo

	const localeDate = new Date(date)
		.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		})
		.split(' ')
		.map(part => part.replace(',', ''))

	return {
		from,
		background:
			frame < 30 ? (
				<>
					<FastTravel
						tick={frame}
						speed={10 + frame / 2}
					/>
				</>
			) : (
				<WormHole
					tick={frame}
					speed={0.2 - frame * 0.0001}
				/>
			),
		camera:
			frame < 30 ? (
				<Camera
					position={[0, 0, 400]}
					fov={100}
				/>
			) : (
				<Camera
					position={[0, 0.01, 400]}
					fov={30 + frame / 4}
				/>
			),
		content: (
			<>
				<FadeIn
					frame={frame}
					delay={30}>
					<div className='flex items-center justify-center gap-2 font-mono text-5xl font-bold uppercase'>
						{localeDate.map((n, i) => {
							return (
								<div
									key={i}
									className='rounded-lg border border-white bg-white/10 px-8 py-4 text-white/80'
									style={{
										boxShadow: 'rgba(255 255 255 / 0.5) 0px 0px 16px 4px inset'
									}}>
									{n}
								</div>
							)
						})}
					</div>
					<h2 className='text-pretty headline mt-6 text-white/80'>{text}</h2>
				</FadeIn>

				<div
					className='absolute z-10 h-full w-full bg-white/50'
					style={{display: frame === 30 ? 'block' : 'none'}}
				/>

				<div
					className='absolute z-10 h-full w-full bg-white/80'
					style={{
						display:
							frame === 35 || frame === 140 || frame === 145 || frame === 149
								? 'block'
								: 'none'
					}}
				/>
			</>
		)
	}
}
