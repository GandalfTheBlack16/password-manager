const API_ENDPOINT: string = import.meta.env.VITE_AUTH_SRV_URI;

export async function signUp({
    username,
    password
}: { username: string, password: string }) {
    try {
        const respone = await fetch(`${API_ENDPOINT}/signup`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await respone.json();
        console.log('Logged in', { data });
    } catch(err) {
        console.log('Login error', { err });
    }
}