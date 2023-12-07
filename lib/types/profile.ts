import {Json} from './supabase'

export interface Profile {
	created_at: string
	id: string
	is_public: boolean
	video_manifest: Json
	github_stats: Json
	pull_requests_opened: number
	company: string
	user_name: string
	avatar_url: string
	email: string
}
