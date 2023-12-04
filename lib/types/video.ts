import z from 'zod'

export const videoSchema = z.object({
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
							.describe('Pull request animation'),
						z
							.object({
								type: z.enum(['people']),
								people: z.array(z.string().url())
							})
							.describe('The profile photos of people to be displayed'),
						z
							.object({
								type: z.enum(['languages']),
								languages: z.array(z.string())
							})
							.describe('The languages to be displayed')
					])
					.optional()
					.describe('Animation to be used to display alongside the text')
			})
		)
		.describe('An array of scenes in the video')
})

export type Manifest = z.infer<typeof videoSchema>
