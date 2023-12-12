import {Session} from '@supabase/supabase-js'

// Checks if the user is engaging with their own information
export default function checkIfSelf(session: Session, username: string) {
	console.log(session)
	// No session
	if (!session) return false

	// Authenticated user viewing thier content
	if (session.user.user_metadata.user_name === username) return true

	// Everything else
	return false
}
