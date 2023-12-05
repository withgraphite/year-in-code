import {deployFunction, deploySite, getOrCreateBucket} from '@remotion/lambda'
import path from 'path'
import {RAM, REGION, SITE_NAME, TIMEOUT} from './config'

export default async function deploy() {
	const {functionName, alreadyExisted: functionAlreadyExisted} =
		await deployFunction({
			createCloudWatchLogGroup: true,
			memorySizeInMb: RAM,
			region: 'us-east-1',
			timeoutInSeconds: TIMEOUT
		})
	console.log(
		functionName,
		functionAlreadyExisted ? '(already existed)' : '(created)'
	)

	process.stdout.write('Ensuring bucket... ')
	const {bucketName, alreadyExisted: bucketAlreadyExisted} =
		await getOrCreateBucket({
			region: REGION
		})
	console.log(
		bucketName,
		bucketAlreadyExisted ? '(already existed)' : '(created)'
	)

	process.stdout.write('Deploying site... ')
	const {siteName} = await deploySite({
		bucketName,
		entryPoint: path.join(process.cwd(), 'remotion', 'index.ts'),
		siteName: SITE_NAME,
		region: REGION
	})

	console.log(siteName)

	console.log()
	console.log('You now have everything you need to render videos!')
}

deploy()
