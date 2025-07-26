// TODO: Create a page so users can edit their details
import "../css/Login.css"
import { useState } from "react";

function EditDetails() {
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [groupCode, setGroupCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name) {
            axios.post('http://localhost:5050/record/updateName', {
                name
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (user) {
            axios.post('http://localhost:5050/record/updateUser', {
                user
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (email) {
            axios.post('http://localhost:5050/record/updateEmail', {
                email
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (pass) {
            axios.post('http://localhost:5050/record/updatePass', {
                pass
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err));
        }
        if (groupCode && groupCode.length === 6) {
            axios.post('http://localhost:5050/record/updateGroupCode', {
                groupCode
            })
        }

        setName('');
        setUser('');
        setEmail('');
        setPass('');
        setGroupCode('');
    };

    return (
        <div className="register">
            <div className="auth-form-container">
                <h2>Edit my account details</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="(name from db)" id="name" name="name" />
                    <br></br>
                    <label htmlFor="user">Username:</label>
                    <input value={user} onChange={(e) => setUser(e.target.value)} type="user" placeholder="(username from db)" id="user" name="user" />
                    <br></br>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="(email from db)" id="email" name="email" />
                    <br></br>
                    <label htmlFor="password">Password:</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
                    <br></br>
                    <label htmlFor="groupCode">Change Group Code:</label>
                    <input value={groupCode} onChange={(e) => setGroupCode(e.target.value.toUpperCase())} type="text" placeholder="6 letter group code" 
                            id="groupCode" name="groupCode" maxLength={6} />
                    <br></br>
                    <button type="submit">Update details</button>
                </form>
            </div>
        </div>
    )
}

export default EditDetails;