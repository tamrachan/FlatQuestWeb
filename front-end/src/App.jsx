import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import FlatPageNavBar from './components/FlatPageNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import FlatPage from './pages/FlatPage';
import Games from './pages/Games';
import EditDetails from './pages/EditDetails';
import './css/App.css';
import { UserProvider } from './components/UserContext';

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
                </Routes>
            </main>
        </div>
    );
}

export default App;
