import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import Auth from 'lib/components/Auth'
import {getUserStats} from 'lib/utils/stats'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import OpenAI from 'openai'
import env from '~/env.mjs'

const openai = new OpenAI({apiKey: env.OPENAI_API_KEY})

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (!session) redirect('/')

	console.log(session)

	const githubStats = await getUserStats(session.provider_token)

	// Write Story

	console.log('Writing Story')

	const storyData = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `You are Github Video Writer, an AI tool that is responsible for generating a compelling narative story arch based on a user's year in code. It is very important that this video feels personal, motivated by their real activities and highlights what was special about that user's year in code. The goal of this video is to make the end user feel seen, valued and have a nostalgic moment of review. You don't need to touch on everything, rather hone in on and focus on the key elements that made this year special.`
			},
			{
				role: 'user',
				content: `The metadata for this video is as follows: ${JSON.stringify(
					githubStats
				)}`
			}
		],
		model: 'gpt-4-1106-preview'
	})

	const story = storyData.choices[0].message.content

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<h1>Dashboard</h1>
			<p>
				Welcome <b>{session.user.user_metadata.user_name}</b>, you are
				authenticated.
			</p>
			<Auth session={session} />
			{story}
		</div>
	)
}
