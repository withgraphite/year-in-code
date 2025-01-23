'use client'

import {AnimatePresence} from 'framer-motion'

const AnimatedModal = ({children}) => {
	return (
		<div className='fixed left-1/2 top-1/2 z-20 flex w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 items-center justify-center'>
			<AnimatePresence>{children}</AnimatePresence>
		</div>
	)
}

export default AnimatedModal
