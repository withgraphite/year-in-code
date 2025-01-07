import {staticFile} from 'remotion'

export const getAssetUrl = (src: string) => {
	// return `${env.NEXT_PUBLIC_WEBSITE ? '/assets/' : 'public/assets/'}${src}`
	return staticFile('/assets/' + src)
	// return `/assets/${src}`
}
