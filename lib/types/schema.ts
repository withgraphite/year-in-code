import {z} from 'zod'

export const CompositionProps = z.object({
	title: z.string()
})

export const RenderRequest = z.object({
	id: z.string(),
	inputProps: CompositionProps
})

export const ProgressRequest = z.object({
	bucketName: z.string(),
	id: z.string()
})

export type ProgressResponse =
	| {
			type: 'error'
			message: string
	  }
	| {
			type: 'progress'
			progress: number
	  }
	| {
			type: 'done'
			url: string
			size: number
	  }
