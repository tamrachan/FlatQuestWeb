import { Link } from "react-router-dom";
import "../css/NavBar.css"

function FlatPageNavBar() {
    return <nav className="navbar">
        <div className="navbar-title">
            <Link to="/">Flat Quest</Link>
        </div>
        <div className="navbar-links">
            <Link to="/flatpage" className="nav-link">FlatPage</Link>
            <Link to="/games" className="nav-link">Mini games</Link>
            <Link to="/details" className="nav-link">Edit account</Link>
        </div>
    </nav>
}

export default FlatPageNavBar;