import {useCurrentFrame} from 'remotion'
import FastTravel from '~/environment/FastTravel'
import Canvas from '../3d/Canvas'
import Camera from '../camera/Camera'
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
							<Camera
								position={[0, 0, 400]}
								fov={100}
							/>
						}>
						<FastTravel
							tick={frame}
							speed={10 + frame / 3}
						/>
					</Canvas>
					<FadeIn
						frame={frame}
						duration={60}
						delay={15}>
						<Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0.01, 400]}
									fov={30 + frame / 4}
								/>
							}>
							<WormHole
								tick={frame}
								speed={0.15 - frame * 0.0001}
							/>
						</Canvas>
					</FadeIn>
					{/* <FadeIn
						frame={frame}
						duration={30}
						delay={10}>
						<Canvas
							frame={frame}
							camera={
								<Camera
									position={[0, 0.5 - frame / 130, 300 - frame / 1]}
									fov={50 - frame / 3}
								/>
							}>
							<WormHole
								tick={frame}
								speed={0.25 - frame * 0.0005}
							/>
						</Canvas>
					</FadeIn> */}
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
						className='absolute z-10 h-full w-full bg-white/30'
						style={{display: frame === 140 ? 'block' : 'none'}}
					/>
					<div
						className='absolute z-10 h-full w-full bg-white/50'
						style={{display: frame === 145 ? 'block' : 'none'}}
					/>
					<div
						className='absolute z-10 h-full w-full bg-white/50'
						style={{display: frame === 149 ? 'block' : 'none'}}
					/>
				</>
			}
		/>
	)
}
