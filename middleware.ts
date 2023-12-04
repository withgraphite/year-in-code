import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import {NextResponse, type NextRequest} from 'next/server'
import {Database} from '~/types/supabase'

// Refresh session for server components
export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient<Database>({req, res})
	await supabase.auth.getSession()
	return res
}
