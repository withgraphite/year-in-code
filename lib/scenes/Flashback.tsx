import {useCurrentFrame} from 'remotion'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
import FastTravel from '../environment/FastTravel'
import WormHole from '../environment/WarpDrive'
import FadeIn from '../transitions/FadeIn'
import Sequence from '../video/Sequence'

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

	// const speed = useRamp(2, -2, 150, frame)

	return (
		<Sequence
			from={from}
			transitionIn='warp'
			transitionOut='warp'
			background={
				<>
					<Canvas
						frame={frame}
						camera={
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
							)
						}>
						{frame < 30 ? (
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
						)}
					</Canvas>
				</>
			}
			content={
				<>
					<FadeIn
						frame={frame}
						delay={30}>
						<h2 className='text-white/80'>{text}</h2>
						<h1 className='text-center font-mono'>
							{new Date(date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit'
							})}
						</h1>
					</FadeIn>

					<div
						className='absolute z-10 h-full w-full bg-white/50'
						style={{display: frame === 30 ? 'block' : 'none'}}
					/>

					<div
						className='absolute z-10 h-full w-full bg-white/80'
						style={{display: frame === 35 ? 'block' : 'none'}}
					/>

					<div
						className='absolute z-10 h-full w-full bg-white/80'
						style={{display: frame === 140 ? 'block' : 'none'}}
					/>
					<div
						className='absolute z-10 h-full w-full bg-white/80'
						style={{display: frame === 145 ? 'block' : 'none'}}
					/>
					<div
						className='absolute z-10 h-full w-full bg-white/80'
						style={{display: frame === 149 ? 'block' : 'none'}}
					/>
				</>
			}
		/>
	)
}
