import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Auth from '~/components/Auth'
import Player from '~/components/Player'
import {Database} from '~/types/supabase'
import {Manifest} from '~/types/video'
// import generateVideo from '~/utils/generate'
// import {getUserStats} from '~/utils/stats'

export default async function Dashboard({
	params
}: {
	params: {username: string}
}) {
	const supabase = createServerComponentClient<Database>({cookies})
	const {
		data: {session}
	} = await supabase.auth.getSession()

	if (!session) redirect('/')

	// GitHub provider_token is null if a user revisits the page after the token has expired
	// Supabase does not plan on adding support for this anytime soon
	// Improvement: https://github.com/supabase/gotrue-js/issues/806 manually make request to GitHub
	// API and reset the provider token
	if (session.provider_token === null) {
		await supabase.auth.signOut()
		redirect('/')
	}

	// Fetch GitHub stats, create story from stats & video scenes from story
	// const stats = await getUserStats(session.provider_token)
	// console.log(stats)
	// const video = (await generateVideo(stats)) as Manifest

	const video = {
		scenes: [
			{
				text:
					"Hey DexterStorey, let's rewind and relive your incredible year in code on GitHub!",
				animation: {type: 'stars', numStars: 5}
			},
			{
				text:
					"You've pushed boundaries with 471 commits and contributed to 749 activities. That's dedication!"
			},
			{
				text:
					'Your collaboration game was strong with 46 pull requests and 12 code reviews. Teamwork makes the dream work!'
			},
			{
				text:
					"You've nurtured 26 repositories, leaving a trail of innovation in your wake."
			},
			{
				text:
					"HTML, TypeScript, and Svelte were your top languages. You've painted the canvas of the web with your code!",
				animation: {type: 'languages', languages: ['HTML', 'TypeScript', 'Svelte']}
			},
			{
				text:
					"Your top repos were 'dashboard', 'rubric', and 'create-rubric-app'. Stars of your GitHub sky!"
			},
			{
				text:
					"You've connected with the community, following 36 and gaining 20 followers. It's all about connections!"
			},
			{
				text:
					"You've given 93 stars, spreading appreciation and support for fellow developers' work."
			},
			{
				text:
					"Let's not forget those intense coding days! Remember January 12th and April 21st? Your contributions lit up the GitHub graph!"
			},
			{
				text:
					'And who could ignore the epic streak in November? Your passion for code truly shone through!'
			},
			{
				text:
					"Thank you for a year of code, collaboration, and community. Here's to another year of growth and creativity on GitHub!",
				animation: {type: 'stars', numStars: 10}
			}
		]
	} as Manifest

	console.log(video.scenes)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-5'>
			<p>
				Hi {params.username}, welcome to your{' '}
				<span className='font-bold italic'>Year in Code 2023</span>.
			</p>
			<Player video={video} />
			<div className='flex items-center gap-5'>
				<button>Download</button>
				<Auth session={session} />
			</div>
		</div>
	)
}
