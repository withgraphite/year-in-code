'use client'

import {AbsoluteFill, Composition} from 'remotion'

export default function Video({frames}: {frames: any[]}) {
	return (
		<div className='absolute'>
			{frames.map((frame, i) => (
				<Composition
					key={`frame-${i}`}
					id='wrapped'
					durationInFrames={30}
					fps={30}
					width={1920}
					height={1080}
					component={() => (
						<AbsoluteFill
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								fontSize: 60,
								backgroundColor: 'white'
							}}>
							{frame}
						</AbsoluteFill>
					)}
				/>
			))}
		</div>
	)
}
