import { useState } from "react";
import { Link } from "react-router-dom"
import axios from 'axios';
import "../css/Login.css"
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pass);

        if (email !== '' && pass !== '') {
            try {
                //await sendUserDetails({email, pass});
                axios.post('http://localhost:5050/record/login', {email, pass})
                    .then(result => {
                        console.log("Login successful:", result);
                        navigate('/flatpage'); // Redirect to home
                    })
                    .catch(err => console.log(err))
                
                //console.log("Details successfully sent to backend.");
                setEmail('');
                setPass('');
            } catch (error) {
                console.log("Error sending details:", error);
            }
        } else {
            alert("Error logging in: Invalid login details.");
        }
    }

    return (
        <div className="login">
            <div className="auth-form-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Username/Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="username or youremail@gmail.com" id="email" name="email" />
                    <br></br>
                    <label htmlFor="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                    <br></br>
                    <button type="submit">Log in</button>
                </form>
                <Link to="/register" className="link-btn">Don't have an account? Register here!</Link>
            </div>
        </div>
    )
}

export default Login;