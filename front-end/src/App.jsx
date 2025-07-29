import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import FlatPageNavBar from './components/FlatPageNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import FlatPage from './pages/FlatPage';
import Games from './pages/Games';
import EditDetails from './pages/EditDetails';
import './css/App.css';


function App() {
    const location = useLocation();

    // Define routes where you want the alternate navbar
    const showDashboardNav = location.pathname === '/flatpage' || location.pathname ==='/games' || location.pathname === '/details';

    return (
        <div className="App">
            {showDashboardNav ? <FlatPageNavBar /> : <NavBar />}

            <main className="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/flatpage' element={<FlatPage />} />
                    <Route path='/games' element={<Games />} />
                    <Route path='/details' element={<EditDetails />} />
                    <Route path='*' element={<Navigate to='/' replace />} /> {/* Redirects unknown routes to homepage */}
                </Routes>
            </main>
        </div>
    );
}

export default App;
