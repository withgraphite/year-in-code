import Hero from '~/components/Hero'
import {DEFAULT_META} from '~/constants/metadata'

export const dynamic = 'force-dynamic'

export const metadata = {
	...DEFAULT_META
}

export default async function Page() {

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-10 p-5'>
			 <Hero />
		</div>
	)
}
