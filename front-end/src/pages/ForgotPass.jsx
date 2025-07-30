import { useState } from "react";
import axios from "axios";

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [sentPin, setSentPin] = useState(false);
    const [pin, setPin] = useState('');
    const [pinGenerated, setPinGenerated] = useState('');
    const [reset, setReset] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    function generatePin() {
        return Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit string
    }

    const sendEmail = async (e) => {
        e.preventDefault();

        if (email) {
            const newPin = generatePin();
            setPinGenerated(newPin);
            console.log("Generated PIN:", newPin); // For debugging

            try {
                const res = await axios.post('http://localhost:5050/reset/send-pin', { email });
                if (res.status === 200) {
                    setSentPin(true);
                    alert("A PIN has been sent to your email.");
                }

            } catch (error) {
                console.error("Error sending pin:", error);
                alert("Failed to send PIN. Check the email or try again.");
            }

        } else {
            alert("Enter a valid email address");
        }
    };

    // Validate pin and show reset password
    const checkPin = async (e) => {
        e.preventDefault();
        if (pin.length !== 6) return alert("PIN must be 6 digits");

        try {
            const res = await axios.post('http://localhost:5050/reset/verify-pin', { email, pin });
            if (res.status === 200) {
                setReset(true);
                alert("PIN verified. You can now reset your password.");
            }
        } catch (error) {
            console.error("PIN verification failed:", error);
            alert("Invalid or expired PIN.");
        }
    };

    const updatePass = async (e) => {
        e.preventDefault();
        if (pass1 !== pass2) return alert('Passwords do not match');
        if (pass1.length < 6) return alert('Password must be at least 6 characters');

        try {
            const res = await axios.post('http://localhost:5050/reset/update-password', {
                email,
                newPassword: pass1
            });
            if (res.status === 200) {
                alert("Password successfully reset!");
                window.location.href = '/login'; // or use navigate if using React Router
            }
        } catch (error) {
            console.error("Password reset failed:", error);
            alert("Failed to reset password.");
        }
    };

    return (
        <div className="forgot-pass">
            <form className="email-form" onSubmit={sendEmail}>
                <label htmlFor="email">Enter email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <button type="submit">Send Pin</button>
            </form>

            {sentPin && (
                <form className="check-pin" onSubmit={checkPin}>
                    <label htmlFor="pin">Enter Pin from email:</label>
                    <input value={pin} onChange={(e) => setPin(e.target.value)} type="text" placeholder="6 digit pin" id="pin" name="pin" maxLength={6} />
                    <button type="submit">Verify PIN</button>
                </form>
            )}

            {reset && (
                <form className="change-pass" onSubmit={updatePass}>
                    <label htmlFor="password1">New Password:</label>
                    <input value={pass1} onChange={(e) => setPass1(e.target.value)} type="password" id="password1" />
                    <label htmlFor="password2">Confirm New Password:</label>
                    <input value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" id="password2" />
                    <button type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
}

export default ForgotPass;
