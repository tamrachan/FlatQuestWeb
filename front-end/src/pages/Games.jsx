import "../css/Games.css"
import redBeachBall from '../icons/red_beach_ball.png';
import { useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

function Games() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    // If user is not defined, send back to login page
    useEffect(() => {
    if (!user) {
        navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="game-menu">
            <h1>Mini games</h1>

            <p>{user?.user}'s score: 0</p>
            
            <p>Add mini games here</p>
            <div className="game-grid">
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