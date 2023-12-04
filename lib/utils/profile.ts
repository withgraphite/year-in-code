import {
	Session,
	createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
import generateVideo from '~/utils/generate'
import {getUserStats} from '~/utils/stats'

// Handle if a user is new or existing
export default async function profileUser(session: Session): Promise<Manifest> {
	const supabase = createServerComponentClient<Database>({cookies})
	let video: Manifest = {}

	// Check if user profile exists
	const {data, error} = await supabase
		.from('profile')
		.select()
		.eq('id', session.user.id)
		.single()
	if (error) console.error(error.message)

	// First time user
	if (!data) {
		// Fetch GitHub stats, create story from stats & video scenes from story
		const stats = await getUserStats(session.provider_token)
		console.log(stats)

		video = (await generateVideo(stats)) as Manifest

		// Store manifest in database
		const {error} = await supabase.from('profile').insert({video_manifest: video})
		if (error) console.error(error.message)
	} // Returning user
	else video = data.video_manifest as Manifest

	console.log(video.scenes)

	return video
}
