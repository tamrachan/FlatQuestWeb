import { Link } from "react-router-dom";
import "../css/NavBar.css"

function FlatPageNavBar() {
    return <nav className="navbar">
        <div className="navbar-title">
            <p>FlatQuest</p>
            {/* <Link to="/flatpage">Flat Quest</Link> */}
        </div>
        <div className="navbar-links">
            <Link to="/flatpage" className="nav-link">FlatPage</Link>
            <Link to="/games" className="nav-link">Mini games</Link>
        </div>
    </nav>
}

export default FlatPageNavBar;