import domtoimage from 'dom-to-image'
import saveAs from 'file-saver'
import {Stats} from '~/types/github'

export const STATS_ID = 'stats'
export const STATS_MOBILE_ID = 'stats-mobile'

export default function download(user: Stats, isMobile = false) {
	const id = isMobile ? STATS_MOBILE_ID : STATS_ID
	getImage(id, 2).then(blob => {
		saveAs(blob, `${user.username}.png`)
	})
}

export async function getImage(id, scale = 1) {
	let element = document.getElementById(id)

	// Scale image up for crispness
	const formatting = {
		height: element.offsetHeight * scale,
		width: element.offsetWidth * scale,
		style: {
			transform: 'scale(' + scale + ')',
			transformOrigin: 'top left',
			width: element.offsetWidth + 'px',
			height: element.offsetHeight + 'px'
		}
	}

	return await domtoimage.toBlob(element, formatting)
}
