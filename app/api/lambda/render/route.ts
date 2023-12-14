import {
	AwsRegion,
	RenderMediaOnLambdaOutput,
	renderMediaOnLambda,
	speculateFunctionName
} from '@remotion/lambda/client'
import {
	DISK,
	FRAMES_PER_LAMBDA,
	RAM,
	REGION,
	SITE_NAME,
	TIMEOUT
} from 'lambda/config'
import {RenderRequest} from '~/types/schema'
import {executeApi} from '~/utils/helpers'

export const POST = executeApi<RenderMediaOnLambdaOutput, typeof RenderRequest>(
	RenderRequest,
	async (req, body) => {
		if (!process.env.AWS_ACCESS_KEY_ID && !process.env.REMOTION_AWS_ACCESS_KEY_ID)
			throw new TypeError(
				'Set up Remotion Lambda to render videos. See the README.md for how to do so.'
			)

		if (
			!process.env.AWS_SECRET_ACCESS_KEY &&
			!process.env.REMOTION_AWS_SECRET_ACCESS_KEY
		)
			throw new TypeError(
				'The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.'
			)

		const result = await renderMediaOnLambda({
			codec: 'h264',
			functionName: speculateFunctionName({
				diskSizeInMb: DISK,
				memorySizeInMb: RAM,
				timeoutInSeconds: TIMEOUT
			}),
			region: REGION as AwsRegion,
			serveUrl: SITE_NAME,
			composition: body.id,
			inputProps: body.inputProps,
			framesPerLambda: FRAMES_PER_LAMBDA,
			// frameRange: [60, 90],
			downloadBehavior: {
				type: 'download',
				fileName: `${body.inputProps.title}-year-in-code.mp4`
			}
		})

		console.log(result)
		return result
	}
)
