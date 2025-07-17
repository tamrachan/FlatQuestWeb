import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(name, user, email, pass);

        if (name !== '' && user !== '' && email !== '' && pass !== '') {
            console.log("Valid entries - adding to database");
            setEmail('');
            setPass('');
            setName('');
        } else {
            console.log("Invalid entries");
        }

        
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label for="name">Full name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full name" id="name" name="name" />
                <br></br>
                <label for="user">Username:</label>
                <input value={user} onChange={(e) => setUser(e.target.value)} type="user" placeholder="username" id="user" name="user" />
                <br></br>
                <label for="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <br></br>
                <label for="password">Password:</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                <br></br>
                <button type="submit">Log in</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch("login")}>Have an account? Sign in here!</button>
        </div>
        
    )
}