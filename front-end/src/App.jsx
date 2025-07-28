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

function App() {
    const location = useLocation();

    // Define routes where you want the alternate navbar
    const showDashboardNav = location.pathname === '/flatpage' || location.pathname === '/games' || location.pathname === '/details';

    return (
        <div className="App">
            {showDashboardNav ? <FlatPageNavBar /> : <NavBar />}

            <main className="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/flatpage/:username' element={<FlatPage />} /> {/* username is a parameter in the URL */}
                    <Route path='/games' element={<Games />} />
                    <Route path='/details' element={<EditDetails />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;


// import NavBar from './components/NavBar';
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import FlatPage from "./pages/FlatPage"; {/* temp */}
// import './css/App.css';
// import { Routes, Route } from 'react-router-dom';

// function App() {

//     return (
//         <div className="App">
//             <NavBar />
//             <main className='main-content'>
//                 <Routes>
//                     <Route path='/' element={<Home />}></Route>
//                     <Route path='/register' element={<Register />}></Route>
//                     <Route path='/login' element={<Login />}></Route>
//                     <Route path='/flatpage' element={<FlatPage />}></Route> {/* temp */}
//                 </Routes>
//             </main>
//         </div>
//     );
// }

// export default App;