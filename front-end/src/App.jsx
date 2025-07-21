import NavBar from './components/NavBar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FlatPage from "./pages/FlatPage"; {/* temp */}
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
                    <Route path='/flatPage' element={<FlatPage />}></Route> {/* temp */}
                </Routes>
            </main>
        </div>
    );
}

export default App;