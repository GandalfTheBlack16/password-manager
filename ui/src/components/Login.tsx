import { useState } from "react";

function Login(){

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const onUsernameChanged = (event: any) => {
        setUsername(event.target.value);
    }
    
    const onPasswordChanged = (event: any) => {
        setPassword(event.target.value);
    }

    const submitForm = (event:any) => {
        event.preventDefault();
        
    }

    return (
        <div className="login_form">
            <h3>Login into your account</h3>
            <form onSubmit={submitForm}>
                <input 
                    id='username_input'
                    type='text'
                    placeholder="Username"
                    value={ username }
                    onChange={ onUsernameChanged }
                />
                <input 
                    id='password_input'
                    type='password'
                    placeholder="Password"
                    value={ password }
                    onChange={ onPasswordChanged }
                />
            </form>
        </div>
    );
}

export default Login;