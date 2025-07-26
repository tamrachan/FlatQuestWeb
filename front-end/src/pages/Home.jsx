import "../css/Home.css";
import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="home">
            <h1>🏠 Welcome to FlatQuest!</h1>
            <br></br>
            <h3>Turn flat chores into epic quests.</h3>
            <p className="home-p">
                FlatQuest makes shared living simple, fun, and fair.<br></br>
                Whether you're in a student flat, shared house, or co-living space, we help you and your flatmates stay organised—and maybe even enjoy doing chores.
            </p><br></br>
            <h3>How it works:</h3>
            <p className="home-p">
                <ul>
                    <li>Join your flat with a <strong>group code</strong> and unlock your shared space as a team.</li>
                    <li>Assign a <strong>Flat Leader</strong> to help organise tasks and keep things moving.</li>
                    <li><strong>Shared To-Do List</strong> – Know what needs doing and who’s doing it.</li>
                    <li><strong>Personal To-Do List</strong> – Stay on top of your own responsibilities.</li>
                    <li><strong>Solve Disputes with Games</strong> – Can't agree who should take the bins out? Let a game decide!</li>
                    <li><strong>Level Up Your Flat</strong> – Earn rewards, complete quests, and become the ultimate flatmate squad.</li>
                </ul>
            </p><br></br>
            <h3>Why FlatQuest?</h3>
            <p className="home-p">
                No more passive-aggressive sticky notes. <br></br>
                No more forgotten chores. <br></br>
                Just teamwork, transparency, and a touch of fun.<br></br><br></br>
                <Link to="/register" className="link-btn">Create your FlatQuest account today</Link>  and turn everyday chores into epic wins.
                <br></br>
            </p><br></br>
            <h4>Teamwork. Gamified. Simplified.</h4>
        </div>
    )
}

export default Home;