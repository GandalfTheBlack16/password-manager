import { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";

export default function useLogin(){
    const [ isLogin, setIsLogin ] = useState(true);

    const onFormSwitched = () => setIsLogin(current => !current)
    
    const loginSwitchText = isLogin ? "Don't have an account? ": "Have an account already? "
    
    const loginButtonText = isLogin ? "Sign up": "Log in"

    const formHeaderText = isLogin ? "Login into your account": "Create a new account"

    const selectedForm = isLogin ? <LoginForm />: <SignupForm />

    return { 
        loginSwitchText,
        loginButtonText,
        onFormSwitched,
        formHeaderText,
        selectedForm
    }
}