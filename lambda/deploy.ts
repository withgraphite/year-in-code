import {deployFunction, deploySite, getOrCreateBucket} from '@remotion/lambda'
import path from 'path'
import {DISK, RAM, REGION, SITE_NAME, TIMEOUT} from './config'
import {webpackOverride} from './webpack-override'

export default async function deploy() {
	const {functionName, alreadyExisted: functionAlreadyExisted} =
		await deployFunction({
			createCloudWatchLogGroup: true,
			memorySizeInMb: RAM,
			diskSizeInMb: DISK,
			region: REGION,
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
		entryPoint: path.join(process.cwd(), 'lambda', 'root.ts'),
		siteName: SITE_NAME,
		options: {
			publicDir: path.join(process.cwd(), 'public'),
			webpackOverride: webpackOverride
		},
		region: REGION
	})

	console.log(siteName)

	console.log('You now have everything you need to render videos!')
}

deploy()
