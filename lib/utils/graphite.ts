// Define the response type
interface GraphiteUserResponse {
	isGraphiteUser: boolean
}

// Check if GitHub user is also a Graphite user
export default async function getGraphiteUser({
	username
}: {
	username: string
}): Promise<GraphiteUserResponse> {
	try {
		const response = await fetch(
			`https://app.graphite.dev/api/v1/year-in-code/user/${username}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		if (!response.ok) throw new Error(`Error: ${response.status}`)
		const data = await response.json()
		return data.isGraphiteUser
	} catch (error) {
		console.error('Failed to fetch user data:', error)
		return null
	}
}
