import "../css/Games.css"
import redBeachBall from '../icons/red_beach_ball.png';

function Games() {

    return (
        <div className="game-menu">
            <h1>Mini games</h1>
            
            <p>Add mini games here</p>
            <div className="game-grid">
                <div className="game-card">
                    <h3>TicTacToe</h3>
                    <h4>2 players</h4>
                    <img className="game-img" src={redBeachBall}></img>
                    <p className="game-desc">Battle it out over a two-player TicTacToe game</p>
                </div>
            </div>
        </div>
    )
}

export default Games;