import Hero from '~/components/Hero'
import {DEFAULT_META} from '~/constants/metadata'

export const dynamic = 'force-dynamic'

export const metadata = {
	...DEFAULT_META
}

export default async function Page() {
<<<<<<< HEAD

=======
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()
<<<<<<< Updated upstream
	if (session) redirect(`/loading`)
=======

	if (session) redirect(`/loading`)
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> ed20d94 (fix(og images): fix dynamic og route)
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-10 p-5'>
			 <Hero />
		</div>
	)
}
