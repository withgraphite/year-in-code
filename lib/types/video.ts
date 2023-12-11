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
								type: z.enum(['people']),
								people: z.array(z.string().url())
							})
							.describe('The profile photos of people to be displayed'),
						z
							.object({
								type: z.enum(['languages']),
								languages: z.array(z.string()).describe('name such as html5')
							})
							.describe('The languages to be displayed'),
						z
							.object({
								type: z.enum(['contributions']),
								text: z.string()
							})
							.describe('Displays a contribution graph'),
						z
							.object({
								type: z.enum(['months']),
								text: z.string()
							})
							.describe('Displays a chart of monthly contributions'),
						z
							.object({
								type: z.enum(['number']),
								text: z.string(),
								number: z.number(),
								gradient: z.object({
									c1: z.string().describe('hex gradient 1'),
									c2: z.string().describe('hex gradient 2')
								})
							})
							.describe(
								'Displays a large 3D number. Useful for highlighting a specific stat'
							),
						z
							.object({
								type: z.enum(['repos']),
								text: z.string(),
								repos: z.array(
									z.object({
										name: z.string(),
										color: z.string().describe('hex color')
									})
								)
							})
							.describe('Displays a list of repos'),

						z
							.object({
								type: z.enum(['times']),
								text: z.string()
							})
							.describe('Displays a list of times of day with average commits'),

						z
							.object({
								type: z.enum(['allStats'])
							})
							.describe('Displays all stats - useful pre-conclusion'),

						z
							.object({
								type: z.enum(['conclusion']),
								text: z.string()
							})
							.describe('Displays a conclusion')
					])
					.describe('Animation to be used to display alongside the text')
			})
		)
		.describe('An array of scenes in the video')
})

export type Manifest = z.infer<typeof videoSchema>
