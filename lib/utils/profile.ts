import {
	Session,
	createServerComponentClient
} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {Profile} from '~/types/profile'
import {Database} from '~/types/supabase'

type ProfileResponse = {
	data: Profile | undefined
	error: string | null
}

// Handle if a user is new or existing
export default async function getProfile(
	username: string,
	session: Session
): Promise<ProfileResponse> {
	const supabase = createServerComponentClient<Database>({cookies})
	const isOwn = session
		? session.user.user_metadata.user_name === username
		: false

	// Check if user profile exists
	const {data, error} = await supabase
		.rpc('get_profile', {
			id_input: isOwn ? session.user.id : null,
			user_name_input: isOwn ? null : username
		})
		.single()

	// Error: Fetching issue
	if (error) {
		console.error(error.message)
		return {data: undefined, error: error.message}
	}

	// Error: Incomplete profile
	if (data && (!data.video_manifest || !data.github_stats))
		return {data: data, error: 'Incomplete profile'}

	return {data: data ?? undefined, error: null}
}
