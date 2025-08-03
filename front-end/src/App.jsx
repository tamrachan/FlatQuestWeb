import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import FlatPageNavBar from './components/FlatPageNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import FlatPage from './pages/FlatPage';
import Games from './pages/Games';
import TicTacToe from './games/TicTacToe';
import EditDetails from './pages/EditDetails';
import ForgotPass from './pages/ForgotPass';
import './css/App.css';
import AuthRoute from './components/AuthRoute';
import { useEffect, useContext } from "react";
import { UserContext } from "./components/UserContext";


function App() {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("keepLoggedIn");

    const { setUser } = useContext(UserContext);
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    // Define routes where you want the alternate navbar
    const showDashboardNav = location.pathname === '/flatpage' || location.pathname.startsWith('/games') || location.pathname === '/details';

    return (
        <div className="App">
            {showDashboardNav ? <FlatPageNavBar /> : <NavBar />}

            <main className="main-content">
                <Routes>
                    <Route path='/' element={isLoggedIn?<Navigate to={"/flatpage"}/>: <Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/flatpage" element={
                        <AuthRoute>
                            <FlatPage />
                        </AuthRoute>
                    } />
                    <Route path="/games" element={
                        <AuthRoute>
                            <Games />
                        </AuthRoute>
                    } />
                    <Route path="/games/tictactoe" element={
                        <AuthRoute>
                            <TicTacToe />
                        </AuthRoute>
                    } />
                    <Route path="/details" element={
                        <AuthRoute>
                            <EditDetails />
                        </AuthRoute>
                    } />
                    <Route path='/forgotpassword' element={<ForgotPass />} />
                    <Route path='*' element={<Navigate to='/' replace />} /> {/* Redirects unknown routes to homepage */}
                </Routes>
            </main>
        </div>
    );
}

export default App;
