'use client'
import {Session} from '@supabase/auth-helpers-nextjs'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

// Handle Login & Logout
export default function Auth({session}: {session: Session}) {
	return session ? <SignOutButton /> : <SignInButton />
}
