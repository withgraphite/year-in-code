import {
	AwsRegion,
	getRenderProgress,
	speculateFunctionName
} from '@remotion/lambda/client'
import {createServerActionClient} from '@supabase/auth-helpers-nextjs'
import {DISK, RAM, REGION, TIMEOUT} from 'lambda/config'
import {cookies} from 'next/headers'
import {ProgressRequest, ProgressResponse} from '~/types/schema'
import {executeApi} from '~/utils/helpers'

export const POST = executeApi<ProgressResponse, typeof ProgressRequest>(
	ProgressRequest,
	async (req, body) => {
		const supabase = createServerActionClient({cookies})
		const renderProgress = await getRenderProgress({
			bucketName: body.bucketName,
			functionName: speculateFunctionName({
				diskSizeInMb: DISK,
				memorySizeInMb: RAM,
				timeoutInSeconds: TIMEOUT
			}),
			region: REGION as AwsRegion,
			renderId: body.id
		})

		if (renderProgress.fatalErrorEncountered)
			return {
				type: 'error',
				message: renderProgress.errors[0].message
			}

		if (renderProgress.done) {
			// Update status in database
			const {error} = await supabase
				.from('profile')
				.update({
					is_rendered: true,
					download_url: renderProgress.outputFile as string,
					download_size: renderProgress.outputSizeInBytes as number
				})
				.eq('id', body.userId)
			if (error)
				return {
					type: 'error',
					message: error.message
				}
			return {
				type: 'done',
				url: renderProgress.outputFile as string,
				size: renderProgress.outputSizeInBytes as number
			}
		}

		return {
			type: 'progress',
			progress: Math.max(0.03, renderProgress.overallProgress)
		}
	}
)
