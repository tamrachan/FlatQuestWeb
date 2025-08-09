import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../components/AuthRoute";

function EditDetails() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [code, setGroupCode] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in");
            navigate("/login");
            return;
        }

        try {
            // Verify token is valid
            jwtDecode(token);
        } catch {
            alert("Invalid token");
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }

        // Fetch fresh user data from backend instead of using JWT payload
        api.get('/reset/me')
            .then(res => {
                const userData = res.data.user;
                setUser(userData);
                
                // Pre-populate form fields with FRESH data
                setName(userData.name || '');
                setUsername(userData.username || userData.user || '');
                setEmail(userData.email || '');
                setGroupCode(userData.code || '');
            })
            .catch(err => {
                console.error("Failed to fetch user data:", err);
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
            });

        // Remove the old protected route call since /me replaces it
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && name !== user.name) {
            api.patch('/reset/update-name', { name })
                .then(res => {
                    console.log(res.data);
                    // Update both user state and form field
                    setUser(prevUser => ({
                        ...prevUser,
                        name: name
                    }));
                    alert('Name updated successfully!');
                })
                .catch(err => console.error(err));
        }

        if (username && username !== (user.username || user.user)) {
            api.patch('/reset/update-user', { username })
                .then(res => {
                    setUser(prevUser => ({
                        ...prevUser,
                        username: username,
                        user: username // Handle both field names
                    }));
                    alert('Username updated successfully!');
                })
                .catch(err => console.error(err));
        }

        if (email && email !== user.email) {
            api.patch('/reset/update-email', { email })
                .then(res => {
                    setUser(prevUser => ({
                        ...prevUser,
                        email: email
                    }));
                    alert('Email updated successfully!');
                })
                .catch(err => console.error(err));
        }

        if (pass) {
            api.patch('/reset/change-password', { 
                currentPassword: 'prompt_user_for_this', // You'll need current password
                newPassword: pass 
            })
                .then(res => {
                    alert('Password updated successfully!');
                    setPass(''); // Clear password field after success
                })
                .catch(err => console.error(err));
        }

        if (code && code.length === 6 && code !== user.code) {
            api.patch('/reset/update-code', { groupCode: code })
                .then(res => {
                    setUser(prevUser => ({
                        ...prevUser,
                        code: code
                    }));
                    alert('Group code updated successfully!');
                })
                .catch(err => console.error(err));
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="register">
            <div className="auth-form-container">
                <h2>Edit my account details</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name:</label>
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        type="text" 
                        placeholder="Enter your full name"
                        id="name" 
                        name="name" 
                    />
                    <br />
                    
                    <label htmlFor="user">Username:</label>
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        type="text" 
                        placeholder="Enter your username"
                        id="user" 
                        name="user" 
                    />
                    <br />
                    
                    <label htmlFor="email">Email:</label>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="Enter your email"
                        id="email" 
                        name="email" 
                    />
                    <br />
                    
                    <label htmlFor="password">New Password:</label>
                    <input 
                        value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                        type="password" 
                        placeholder="Enter new password (optional)"
                        id="password" 
                        name="password" 
                    />
                    <br />
                    
                    <label htmlFor="groupCode">Group Code:</label>
                    <input 
                        value={code} 
                        onChange={(e) => setGroupCode(e.target.value.toUpperCase())} 
                        type="text" 
                        placeholder="Enter 6-character group code"
                        id="groupCode" 
                        name="groupCode" 
                        maxLength={6} 
                    />
                    <br />
                    
                    <button type="submit">Update details</button>
                </form>
            </div>
        </div>
    );
}


export default EditDetails;