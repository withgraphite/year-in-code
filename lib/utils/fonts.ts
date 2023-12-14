import {continueRender, delayRender, staticFile} from 'remotion'

const font = new FontFace(
	'MatterSQ',
	'url(' + staticFile('fonts/MatterSQ-Regular.otf') + ')',
	{weight: '400'}
)

const font2 = new FontFace(
	'MatterSQ',
	'url(' + staticFile('fonts/MatterSQ-Bold.otf') + ')',
	{weight: '700'}
)

const font3 = new FontFace(
	'MatterSQ',
	'url(' + staticFile('fonts/MatterSQ-Light.otf') + ')',
	{weight: '100'}
)

let injected = false

export const injectFont = () => {
	if (!injected && typeof document !== 'undefined') {
		const handle = delayRender()
		injected = true
		Promise.all([font.load(), font2.load(), font3.load()])
			.then(fonts => {
				fonts.forEach(f => {
					document.fonts.add(f)
				})
				continueRender(handle)
			})
			.catch(err => console.log('Error loading font', err))
	}
}
