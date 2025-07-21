import React, { useState } from "react";
import axios from 'axios';
import "../css/Login.css"

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pass);

        if (email !== '' && pass !== '') {
            try {
                //await sendUserDetails({email, pass});
                axios.post('TBC WITH MONGOOSE', {email, pass})
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                
                //console.log("Details successfully sent to backend.");

                setEmail('');
                setPass('');
            } catch (error) {
                console.log("Error sending details:", error);
            }
        }
    }

    return (
        <div className="login">
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label for="email">Username/Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="username or youremail@gmail.com" id="email" name="email" />
                    <br></br>
                    <label for="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                    <br></br>
                    <button type="submit">Log in</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch("register")}>Don't have an account? Register here!</button>
            </div>
        </div>
        
        
    )
}

export default Login;