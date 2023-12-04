import {ChatOpenAI} from 'langchain/chat_models/openai'
import {JsonOutputFunctionsParser} from 'langchain/output_parsers'
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	SystemMessagePromptTemplate
} from 'langchain/prompts'
import {zodToJsonSchema} from 'zod-to-json-schema'
import env from '~/env.mjs'
import {scenesSchema} from '~/types/scene'

// Generate video scenes using story
export default async function generateScenes(story: string) {
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
				name: 'output_formatter',
				description: 'Should always be used to properly format output',
				parameters: zodToJsonSchema(scenesSchema)
			}
		],
		function_call: {name: 'output_formatter'}
	})

	// Prompt template
	const prompt = new ChatPromptTemplate({
		promptMessages: [
			SystemMessagePromptTemplate.fromTemplate(
				'You are a video editor, who can take a story and convert it into a manifest files containing a list of frames to be used to create a Remotion (https://remotion.dev) video. Given the story, it is your job to create an array of titles where each title is a sentence that would form a series in a video.'
			),
			HumanMessagePromptTemplate.fromTemplate('{story}')
		],
		inputVariables: ['story']
	})
	const outputParser = new JsonOutputFunctionsParser()

	// Init chain
	const chain = prompt.pipe(functionCallingModel).pipe(outputParser)

	// Run chain
	console.log('Creating frames...')
	const scenes = await chain.invoke({
		story
	})

	return scenes
}
