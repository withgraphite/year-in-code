'use client'

import {Session} from '@supabase/supabase-js'
import {ArrowRight} from 'lucide-react'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Stats} from '~/types/github'
import {Manifest} from '~/types/video'
import generateScenes from '~/utils/generate'
import {getStats} from '~/utils/stats'
import Loading from './Loading'

export default function GenerateVideo({session}: {session: Session}) {
	const [stats, setStats] = useState<Stats | null>(null)
	const [scenes, setScenes] = useState<Manifest | null>(null)

	const fetch = async () => {
		// Stats
		const statsResponse = await getStats(session.provider_token)
		setStats(statsResponse)

		// Scenes
		const scenesResponse = await generateScenes(statsResponse, session)
		setScenes(scenesResponse)
	}

	useEffect(() => {
		fetch()
	}, [])

	if (stats && scenes)
		return (
			<Link
				href={`/${session.user.user_metadata.user_name}`}
				className='flex items-center justify-center gap-2 rounded-md border-2 border-black bg-black px-6 py-2 text-white no-underline transition-all hover:bg-white hover:text-black'>
				<span>See video</span>
				<ArrowRight className='h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
			</Link>
		)
	if (stats && !scenes) return <Loading stats={stats} />
	else return <p>Loading...</p>
}
