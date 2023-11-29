import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {LLMChain} from 'langchain/chains'
import {ChatOpenAI} from 'langchain/chat_models/openai'
import {ChatPromptTemplate} from 'langchain/prompts'
import Auth from 'lib/components/Auth'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import OpenAI from 'openai'
import Player from '~/components/Player'
import env from '~/env.mjs'
import {getUserStats} from '~/utils/stats'

const openai = new OpenAI({apiKey: env.OPENAI_API_KEY})

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (!session) redirect('/')

	// Get GitHub stats
	console.log('Fetching stats...')
	const githubStats = await getUserStats(session.provider_token)
	console.log('Fetched!')

	// Write Story
	const chat = new ChatOpenAI({
		temperature: 0,
		openAIApiKey: env.OPENAI_API_KEY,
		modelName: 'gpt-4-1106-preview'
	})

	const chatPrompt = ChatPromptTemplate.fromMessages([
		[
			'system',
			'You are Github Video Writer, an AI tool that is responsible for generating a compelling narative story arch based on a users year in code. It is very important that this video feels personal, motivated by their real activities and highlights what was special about that users year in code. The goal of this video is to make the end user feel seen, valued and have a nostalgic moment of review. You do not need to touch on everything, rather hone in on and focus on the key elements that made this year special.'
		],
		['human', 'The GitHub stats for {username} are as follows: {stats}']
	])

	const storyChain = new LLMChain({
		prompt: chatPrompt,
		llm: chat
	})

	console.log('Writing story... ')
	const story = await storyChain.call({
		username: githubStats.username,
		stats: JSON.stringify(githubStats)
	})

	console.log('Story \n', story.text)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<h1>Dashboard</h1>
			<p>
				Welcome <b>{session.user.user_metadata.user_name}</b>, you are
				authenticated.
			</p>
			<Auth session={session} />
			<Player videoProps={{title: story.text}} />
		</div>
	)
}
