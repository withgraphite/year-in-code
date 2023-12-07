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
								type: z.enum(['intro']),
								name: z.string()
							})
							.describe('Shows "Github Wrapped" in space, zooms to user name'),
						z
							.object({
								type: z.enum(['flashback']),
								dateFrom: z
									.date()
									.describe("Date to tick backwards from. Should be today's date"),
								dateTo: z
									.date()
									.describe('Date to tick backwards to, could be first commit date'),
								text: z.string()
							})
							.describe('Ticks backwards from dateFrom to dateTo then shows text'),
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
								languages: z.array(z.string()).describe('name such as html5')
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
