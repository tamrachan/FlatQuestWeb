import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import "../css/Login.css"

function Register() {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(name, user, email, pass);

        if (name !== '' && user !== '' && email !== '' && pass !== '') {
            axios.post('TBC WITH MONGOOSE', {name,user,email, pass})
                .then(result => console.log(result))
                .catch(err => console.log(err))

            console.log("Valid entries - adding to database");
            setEmail('');
            setPass('');
            setName('');
        } else {
            alert("Error creating account: Ensure all entries are valid.");
        }
    }

    return (
        <div className="register">
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full name" id="name" name="name" />
                    <br></br>
                    <label htmlFor="user">Username:</label>
                    <input value={user} onChange={(e) => setUser(e.target.value)} type="user" placeholder="username" id="user" name="user" />
                    <br></br>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <br></br>
                    <label htmlFor="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                    <br></br>
                    <button type="submit">Log in</button>
                </form>
                <Link to="/login" className="link-btn">Already have an account? Sign in here!</Link>
            </div>
        </div>
    )
}

export default Register;