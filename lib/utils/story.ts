import {LLMChain} from 'langchain/chains'
import {OpenAI} from 'langchain/llms/openai'
import {PromptTemplate} from 'langchain/prompts'
import env from '~/env.mjs'
import {User} from '~/types/github'

// Generate story using GitHub stats
export default async function generateStory(stats: User) {
	// Init LLM
	const llm = new OpenAI({
		temperature: 0,
		openAIApiKey: env.OPENAI_API_KEY,
		modelName: 'gpt-4-1106-preview'
	})

	// Prompt template
	const template = `You are Github Video Writer, an AI tool that is responsible for generating a compelling narative story arch based on a users year in code. 
					  It is very important that this video feels personal, motivated by their real activities and highlights what was special about that users year in code. 
					  The goal of this video is to make the end user feel seen, valued and have a nostalgic moment of review. You do not need to touch on everything, rather 
					  hone in on and focus on the key elements that made this year special.
					  The GitHub stats are as follows: {stats}`

	const promptTemplate = new PromptTemplate({
		template,
		inputVariables: ['stats']
	})

	// Init chain
	const storyChain = new LLMChain({llm, prompt: promptTemplate})

	// Run chain
	console.log('Writing the story...')
	const story = await storyChain.run(JSON.stringify(stats))

	return story
}
