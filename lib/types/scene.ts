import z from 'zod'

export const sceneSchema = z.object({
	scenes: z
		.array(
			z.object({
				title: z.string().describe('The title of the scene containing the')
			})
		)
		.describe('An array of scenes in a video')
})

export type Scene = z.infer<typeof sceneSchema>
