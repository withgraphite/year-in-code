'use client'

import {motion} from 'framer-motion'

export const TestComponent = () => {
	return (
		<motion.div
			layoutId='asdf'
			className='fixed h-[300px] w-[300px] bg-green-300'></motion.div>
	)
}

export const TestComponent2 = () => {
	return (
		<motion.div
			layoutId='asdf'
			className='h-[400px] w-[500px]  bg-red-300'></motion.div>
	)
}
