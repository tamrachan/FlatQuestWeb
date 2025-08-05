import "../css/Games.css"
import redBeachBall from '../icons/red_beach_ball.png';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Games() {
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

    const goToGame = () => {
        navigate("/games/tictactoe");
    };

    return (
        <div className="game-menu">
            <h1>Mini games</h1>

            <p>{user?.username}'s score: 0</p>
            
            <p>Add mini games here</p>
            <div className="game-grid" onClick={goToGame} style={{ cursor: "pointer" }}>
                <div className="game-card">
                    <h3>TicTacToe</h3>
                    <h4>2 players</h4>
                    <img className="game-img" src={redBeachBall}></img>
                    <p className="game-desc">Battle it out over a two-player TicTacToe game</p>
                    {/* TODO: make button link to game */}
                </div>
            </div>
        </div>
    )
}

export default Games;