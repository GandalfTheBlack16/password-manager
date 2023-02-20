import { useState } from "react";
import './Login.css';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login(){

    const [ isLogin, setIsLogin ] = useState(true);

    const onFormSwitched = () => setIsLogin(current => !current)

    const renderSignupForm = () => {
        return (
            <>
            <h2>Create a new account</h2>
            <SignupForm />
            </>
        );
    }

    const renderLoginForm = () => {
        return (
            <>
            <h2>Login into your account</h2>
            <LoginForm />
            </>
        )
    }

    return (
        <>
        <div className="login_form">
            { isLogin ? renderLoginForm(): renderSignupForm() }
            <div className="login_switch">
                { isLogin ? "Don't have an account? ": "Have an account already? " }
                <a 
                    onClick={onFormSwitched}>
                    { isLogin ? "Sign up": "Log in" }
                </a>
            </div>
        </div>
        </>
    );
}

export default Login;