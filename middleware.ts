import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import {NextResponse, type NextRequest} from 'next/server'

// Refresh session for server components
export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({req, res})
	await supabase.auth.getSession()
	return res
}
