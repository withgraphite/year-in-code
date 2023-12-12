import {Session} from '@supabase/supabase-js'
import {Profile} from '~/types/profile'

// Checks if the user is engaging with their own information
export default function checkIfSelf(session: Session, profile: Profile) {
	// No session
	if (!session || !profile) return false

	// Authenticated user viewing thier content
	if (session.user.user_metadata.user_name === profile.user_name) return true

	// Everything else
	return false
}
