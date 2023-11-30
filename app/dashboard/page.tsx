import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {LLMChain, SimpleSequentialChain} from 'langchain/chains'
import {OpenAI} from 'langchain/llms/openai'
import {PromptTemplate} from 'langchain/prompts'
import Auth from 'lib/components/Auth'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import env from '~/env.mjs'
import {getUserStats} from '~/utils/stats'

export default async function Dashboard() {
	const supabase = createServerComponentClient({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (!session) redirect('/')

	// GitHub provider_token is null if a user revisits the page after the token has expired
	// Supabase does not plan on adding support for this anytime soon
	// Improvement: https://github.com/supabase/gotrue-js/issues/806 manually make request to GitHub
	// API and reset the provider token
	if (session.provider_token === null)
		return (
			<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
				<h1>Dashboard</h1>
				<p>
					Welcome <b>{session.user.user_metadata.user_name}</b>, you are
					authenticated.
				</p>
				<Auth session={session} />
			</div>
		)

	// Get GitHub stats
	console.log('Fetching stats...')
	const githubStats = await getUserStats(session.provider_token)

	// Init LLM
	const llm = new OpenAI({
		temperature: 0,
		openAIApiKey: env.OPENAI_API_KEY,
		modelName: 'gpt-4-1106-preview'
	})

	// Chain 1: Generate Story
	const template = `You are Github Video Writer, an AI tool that is responsible for generating a compelling narative story arch based on a users year in code. 
					  It is very important that this video feels personal, motivated by their real activities and highlights what was special about that users year in code. 
					  The goal of this video is to make the end user feel seen, valued and have a nostalgic moment of review. You do not need to touch on everything, rather 
					  hone in on and focus on the key elements that made this year special.
					  The GitHub stats are as follows: {stats}`

	const promptTemplate = new PromptTemplate({
		template,
		inputVariables: ['stats']
	})

	const storyChain = new LLMChain({llm, prompt: promptTemplate})

	// Chain: Generate video manifest
	const remotionTemplate = `You are a video editor, who can take a story and convert it into a manifest files containing a list of frames to be used to create a Remotion (https://remotion.dev) video. Given the story, it is your job to write a JSON manifest for the video.
 								Story:
								{story}
								The JSON manifest file for Remotion is:`
	const remotionPromptTemplate = new PromptTemplate({
		template: remotionTemplate,
		inputVariables: ['story']
	})
	const remotionChain = new LLMChain({
		llm: llm,
		prompt: remotionPromptTemplate
	})

	const overallChain = new SimpleSequentialChain({
		chains: [storyChain, remotionChain],
		verbose: true
	})

	const manifest = await overallChain.run(JSON.stringify(githubStats))
	console.log(manifest)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<h1>Dashboard</h1>
			<p>
				Welcome <b>{session.user.user_metadata.user_name}</b>, you are
				authenticated.
			</p>
			<Auth session={session} />
			{/* <Player videoProps={{title: story.text}} /> */}
		</div>
	)
}
