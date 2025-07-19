import { useState } from "react";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <>
            <div className="App">
                {
                    currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
                }
            </div>
            
            {/* <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
            </BrowserRouter> */}
        </>
    );
}

export default App;