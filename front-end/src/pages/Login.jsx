import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../css/Login.css"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email !== '' && pass !== '') {
            try {
                //await sendUserDetails({email, pass});
                axios.post('http://localhost:5050/record/login', {email, pass})
                    .then(result => {
                        const userData = result.data.user;  // get user object from response
                        
                        // Store in local state
                        setUser({
                            name: userData.name,
                            user: userData.username,
                            email: userData.email,
                            role: userData.role,
                            code: userData.code
                        });

                        // Also store in local storage so details persist between sessions
                        localStorage.setItem("keepLoggedIn", true);
                        localStorage.setItem("userData", JSON.stringify({
                            name: userData.name,
                            user: userData.username,
                            email: userData.email,
                            role: userData.role,
                            code: userData.code
                        }));
                        navigate('/flatpage')
                    })
                    .catch(err => {
                        alert('Invalid login');
                    })
                
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
                <Link to="/forgotpassword" className="link-btn">Forgot your password?</Link>
            </div>
        </div>
    )
}

export default Login;