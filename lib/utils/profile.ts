import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {Profile} from '~/types/profile'
import {Database} from '~/types/supabase'

// Handle if a user is new or existing
export default async function getProfile(
	username: string
): Promise<Profile | undefined> {
	const supabase = createServerComponentClient<Database>({cookies})
	// Check if user profile exists
	const {data, error} = await supabase
		.from('profile')
		.select()
		.eq('user_name', username)
		.single()
	if (error) console.error(error.message)
	return data ?? undefined
}
