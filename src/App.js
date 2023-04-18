import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {AuthProvider} from "./contexts/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Logout from "./components/Logout";

function App() {
    return (
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
    );
}

export default App;