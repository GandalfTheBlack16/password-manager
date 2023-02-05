import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import './Login.css';

function Login(){

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');
    const [ isLogin, setIsLogin ] = useState(true);

    const onUsernameChanged = (event: any) => {
        setUsername(event.target.value);
    }
    
    const onPasswordChanged = (event: any) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordChanged = (event: any) => {
        setConfirmPass(event.target.value);
    }

    const onFormSwitched = (event: any) => {
        event.preventDefault();
        setIsLogin(current => !current);
        setPassword('');
        setConfirmPass('');
    }

    const submitLoginForm = async (event:any) => {
        event.preventDefault();
        if (username && password){
            const url: string = 'http://localhost:3000/login'
            try {
                const respone = await fetch(url, { 
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
    }

    const submitSignupForm = async (event:any) => {
        event.preventDefault();
        if (username && password && confirmPass){
            if (password === confirmPass){
                const url: string = 'http://localhost:3000/signup'
                try {
                    const respone = await fetch(url, {
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
        }
    }

    const renderLoginForm = () => {
        return (
            <>
            <h2>Login into your account</h2>
            <form onSubmit={submitLoginForm}>
                <div className="login_form__input">
                    <input 
                        id='username_input'
                        type='text'
                        placeholder="Username"
                        value={ username }
                        onChange={ onUsernameChanged }
                    />
                </div>
                <div className="login_form__input">
                    <input 
                        id='password_input'
                        type='password'
                        placeholder="Password"
                        value={ password }
                        onChange={ onPasswordChanged }
                    />
                </div>
                <div className="login_form__submit">
                    <input 
                        type='submit'
                        value='Login'
                    />
                </div>
            </form>
            </>
        );
    }

    const renderSignupForm = () => {
        return (
            <>
            <h2>Create a new account</h2>
            <form onSubmit={submitSignupForm}>
                <div className="login_form__input">
                    <input 
                        id='username_input'
                        type='text'
                        placeholder="Username"
                        value={ username }
                        onChange={ onUsernameChanged }
                    />
                </div>
                <div className="login_form__input">
                    <input 
                        id='password_input'
                        type='password'
                        placeholder="Password"
                        value={ password }
                        onChange={ onPasswordChanged }
                    />
                </div>
                <div className="login_form__input">
                    <input 
                        id='confirmPass_input'
                        type='password'
                        placeholder="Confirm password"
                        value={ confirmPass }
                        onChange={ onConfirmPasswordChanged }
                    />
                </div>
                <div className="login_form__submit">
                    <input 
                        type='submit'
                        value='Login'
                    />
                </div>
            </form>
            </>
        );
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