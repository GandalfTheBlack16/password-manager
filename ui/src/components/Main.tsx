import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"
import Login from "./login/Login";
import Vault from "./vault/Vault";

export default function Main() {

    const { userAuthenticated, accessToken } = useContext(AuthContext);
    return (
        <>
            { userAuthenticated ? <Vault username={userAuthenticated} token={accessToken} />: <Login /> }
        </>
    )
}