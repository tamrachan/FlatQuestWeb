import { Link } from "react-router-dom";
import "../css/NavBar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-title">
            <Link to="/">Flat Quest</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/flatpage" className="nav-link">FlatPage</Link> {/* temp */}
        </div>
    </nav>
}

export default NavBar;