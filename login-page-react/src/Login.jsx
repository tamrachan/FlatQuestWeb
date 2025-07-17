import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);

        setEmail('');
        setPass('');
    }

    return (
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
        
    )
}