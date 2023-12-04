import z from 'zod'

export const scenesSchema = z.object({
	scenes: z
		.array(
			z.object({
				text: z.string().describe('Text to be displayed on screen'),
				animation: z
					.discriminatedUnion('type', [
						z
							.object({
								type: z.enum(['stars']),
								numStars: z.number()
							})
							.describe('Star animation'),
						z
							.object({
								type: z.enum(['prs']),
								pullReqs: z.number()
							})
							.describe('Pull request animation')
					])
					.optional()
					.describe('Animation to be used to display alongside the text')
			})
		)
		.describe('An array of scenes in the video')
})

export type Scenes = z.infer<typeof scenesSchema>
