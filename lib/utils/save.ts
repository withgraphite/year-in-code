import domtoimage from 'dom-to-image'
import saveAs from 'file-saver'
import {Stats} from '~/types/github'

export default function download(user: Stats) {
	getImage(2).then(blob => {
		saveAs(blob, `${user.username}.png`)
	})
}

export async function getImage(scale = 1) {
	let element = document.getElementById('stats')

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
