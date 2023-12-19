'use client'

import {Session} from '@supabase/supabase-js'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Stats} from '~/types/github'
import {Manifest} from '~/types/video'
import generateScenes from '~/utils/generate'
import {getStats} from '~/utils/stats'
import Loading from './Loading'

export default function GenerateVideo({session}: {session: Session}) {
	const [stats, setStats] = useState<Stats | null>(null)
	const [scenes, setScenes] = useState<Manifest | null>(null)
	const router = useRouter()

	const fetch = async () => {
		// Stats
		const statsResponse = await getStats(session)
		setStats(statsResponse)

		// Scenes
		const scenesResponse = await generateScenes(statsResponse, session)
		setScenes(scenesResponse)
	}

	useEffect(() => {
		fetch()
	}, [])

	if (stats && scenes) router.push(`/${session.user.user_metadata.user_name}`)
	if (stats && !scenes) return <Loading stats={stats} />
	else return <h2 className='font-thin'>Loading...</h2>
}
