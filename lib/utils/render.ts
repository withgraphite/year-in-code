import {
	renderMediaOnLambda,
	speculateFunctionName
} from '@remotion/lambda/client'
import {DISK, RAM, REGION, SITE_NAME, TIMEOUT} from 'lambda/config'

export default async function render({id, inputProps, title}) {
	const result = await renderMediaOnLambda({
		codec: 'h264',
		functionName: speculateFunctionName({
			diskSizeInMb: DISK,
			memorySizeInMb: RAM,
			timeoutInSeconds: TIMEOUT
		}),
		region: REGION,
		serveUrl: SITE_NAME,
		composition: id,
		inputProps: inputProps,
		framesPerLambda: 10,
		downloadBehavior: {
			type: 'download',
			fileName: `${title}.mp4`
		}
	})

	return result
}
