import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {

    const [username, setUsername] = useState("pranjal")

    const [password, setPassword] = useState("pass")

    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();

    const auth = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (auth.login(username, password)) {
            setErrorMessage(false)
            navigate(`/welcome/${username}`)
        }

        else {
            
            setErrorMessage(true);
        }
    }


    return (
        <div className="Login">
            <h1>Time to Log In</h1>
            {errorMessage && <div>Authentication failed!</div>}
            <div className="LoginForm" >
                <div>
                    <label>User Name: </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" onChange={handlePasswordChange} value={password}></input>
                </div>
                <div>
                    <button className="" name="login" onClick={handleSubmit} >Login</button>
                </div>
            </div>
        </div>
    )

}