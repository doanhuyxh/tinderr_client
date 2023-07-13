import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import VideoPage from "./pages/VideoPage";
import GirlsPage from "./pages/GirlsPage";


function App() {

    return (
        <>
            <div className="container full-height">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/video" element={<VideoPage/>}/>
                    <Route path="/votingHall" element={<VideoPage/>}/>
                    <Route path="/girls" element={<GirlsPage/>}/>
                </Routes>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-danger position-fix-bottom">
                <div className="container-fluid">
                    <Link to="/" className="nav-link">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/login" className="nav-link d-none">Login</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                            <Link to="/video" className="nav-link">Video</Link>
                            <Link to="/girls" className="nav-link">Girl</Link>
                            <Link to="/votingHall" className="nav-link">VotingHall</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default App;
