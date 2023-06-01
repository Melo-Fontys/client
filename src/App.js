import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Logout from "./components/Logout";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

function App() {
    return (
        <>

            <AuthProvider>
                <Router>
                    <Routes>
                        <Route exact path="/register" element={<Register/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/logout" element={<Logout/>}/>
                        <Route exact path="/home" element={<Home/>}/>
                        {/*<Route exact path="/profile" element={<Profile/>}/>*/}

                    </Routes>
                </Router>
            </AuthProvider>
        </>
    );
}
export default App;