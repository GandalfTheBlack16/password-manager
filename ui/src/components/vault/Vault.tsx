
export default function Vault({ username, token }: {username: string, token: string}) {
    return (
        <div>
            <h1>Hello {username}</h1>
            <h2>Your access token is: </h2>
            <pre>{ token }</pre>
        </div>
    )
}