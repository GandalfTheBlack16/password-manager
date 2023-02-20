import useLogin from "../../hooks/useLogin";
import './Login.css';

function Login(){

    const { 
        loginSwitchText, 
        loginButtonText, 
        onFormSwitched, 
        formHeaderText, 
        selectedForm 
    } = useLogin();
    
    return (
        <div className="login_form">
            <h2>{ formHeaderText }</h2>
            { selectedForm }
            <div className="login_switch">
                { loginSwitchText }
                <a 
                    onClick={onFormSwitched}>
                    { loginButtonText }
                </a>
            </div>
        </div>
    );
}

export default Login;