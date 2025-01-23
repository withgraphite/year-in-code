import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import {ProfilePage} from '~/components/Profile'
import {META} from '~/constants/metadata'
import {Database} from '~/types/supabase'
import getProfile from '~/utils/profile'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
	params
}: {
	params: {username: string}
}): Promise<Metadata | undefined> {
	if (!params.username) return
	const ogImage = META.domain.prod + `og?title=@${params.username}`

	return {
		title: `${params.username} | Year in code | Graphite`,
		description: `Check out ${params.username}'s 2024 year in code!`,
		openGraph: {
			title: `${params.username} | Year in code | Graphite`,
			url: META.domain.prod + params.username,
			description: `Check out ${params.username}'s 2024 year in code!`,
			images: [
				{
					url: ogImage
				}
			]
		},
		twitter: {
			title: `${params.username} | Year in code | Graphite`,
			description: `Check out ${params.username}'s 2024 year in code!`,
			images: [
				{
					url: ogImage
				}
			]
		}
	}
}

export default async function Profile({params}: {params: {username: string}}) {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
	const {data: profile, error} = await getProfile(params.username, session)

	return (
		<ProfilePage
			profile={profile}
			error={error}
			username={params.username}
			session={session}
		/>
	)
}
