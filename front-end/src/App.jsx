import NavBar from './components/NavBar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import './css/App.css';
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <NavBar />
            <main className='main-content'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;