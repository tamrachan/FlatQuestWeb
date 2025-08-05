import { useEffect, useState } from "react";
// import { UserContext } from "../components/UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function EditDetails() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in");
            navigate("/login");  // redirect to login page
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch {
            alert("Invalid token");
            localStorage.removeItem("token");
            navigate("/login");
        return;
        }

        // Optional: fetch protected data
        axios.get("http://localhost:5050/record/protected", {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(res => {
        console.log("Protected data:", res.data);
        }).catch(err => {
            console.error("Token expired or invalid:", err);
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name) {
            axios.post('http://localhost:5050/record/update-name', {
                name
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (username) {
            axios.post('http://localhost:5050/record/update-user', {
                username
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (email) {
            axios.post('http://localhost:5050/record/update-email', {
                email
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (pass) {
            axios.post('http://localhost:5050/record/update-password', {
                pass
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (groupCode && groupCode.length === 6) {
            axios.post('http://localhost:5050/record/update-code', {
                groupCode
            })
        }

        setName('');
        setUser('');
        setEmail('');
        setPass('');
        setGroupCode('');
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="register">
            <div className="auth-form-container">
                <h2>Edit my account details</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name:</label>
                    <input value={user.name} onChange={(e) => setName(e.target.value)} type="name" placeholder={user.name} id="name" name="name" />
                    <br></br>
                    <label htmlFor="user">Username:</label>
                    <input value={user.username} onChange={(e) => setUsername(e.target.value)} type="user" placeholder={user.user} id="user" name="user" />
                    <br></br>
                    <label htmlFor="email">Email:</label>
                    <input value={user.email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={user.email} id="email" name="email" />
                    <br></br>
                    <label htmlFor="password">Password:</label>
                    <input value={user.pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                    <br></br>
                    <label htmlFor="groupCode">Change Group Code:</label>
                    <input value={user.code} onChange={(e) => setGroupCode(e.target.value.toUpperCase())} type="text" placeholder={user.code} 
                            id="groupCode" name="groupCode" maxLength={6} />
                    <br></br>
                    <button type="submit">Update details</button>
                </form>
            </div>
        </div>
    )
}

export default EditDetails;