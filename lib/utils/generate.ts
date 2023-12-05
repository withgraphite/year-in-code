import {ChatOpenAI} from 'langchain/chat_models/openai'
import {JsonOutputFunctionsParser} from 'langchain/output_parsers'
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate
} from 'langchain/prompts'
import {zodToJsonSchema} from 'zod-to-json-schema'
import env from '~/env.mjs'
import {User} from '~/types/github'
import {videoSchema} from '~/types/video'

// Generate video scenes using story
export default async function generateScenes(stats: User) {
	// Init LLM
	const llm = new ChatOpenAI({
		modelName: 'gpt-4-1106-preview',
		openAIApiKey: env.OPENAI_API_KEY,
		temperature: 0
	})

	// Bind function calling to LLM
	const functionCallingModel = llm.bind({
		functions: [
			{
				name: 'renderVideo',
				description: 'Should always be used to properly format output',
				parameters: zodToJsonSchema(videoSchema)
			}
		],
		function_call: {name: 'renderVideo'}
	})

	// Prompt template
	const prompt = new ChatPromptTemplate({
		promptMessages: [
			SystemMessagePromptTemplate.fromTemplate(
				`You are Github Video Maker, an AI tool that is responsible for generating a compelling narative video based on a users year in code. 
				It is very important that this video feels personal, motivated by their real activities and highlights what was special about that users year in code. 
				The goal of this video is to make the end user feel seen, valued and have a nostalgic moment of review. You do not need to touch on everything, rather 
				hone in on and focus on the key elements that made this year special.
				Today's date is ${new Date().toLocaleDateString()}.`
			),
			HumanMessagePromptTemplate.fromTemplate(
				'The GitHub stats are as follows: {stats}'
			)
		],
		inputVariables: ['stats']
	})
	const outputParser = new JsonOutputFunctionsParser()

	// Init chain
	const chain = prompt.pipe(functionCallingModel).pipe(outputParser)

	// Run chain
	console.log('Creating frames...')
	const scenes = await chain.invoke({
		stats: JSON.stringify(stats)
	})

	return scenes
}
