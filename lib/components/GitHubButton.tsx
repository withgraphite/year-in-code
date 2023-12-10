import {GithubIcon} from 'lucide-react'
import Link from 'next/link'

export default function GitHubButton({
	username,
	className = 'w-5 h-5'
}: {
	username: string
	className?: string
}) {
	return (
		<Link
			href={`https://github.com/${username}`}
			target='_blank'>
			<GithubIcon
				className={`${className} rounded-full p-1.5 transition-all duration-300 hover:bg-black hover:text-white`}
			/>
		</Link>
	)
}
