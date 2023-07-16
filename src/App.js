import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import VideoPage from "./pages/VideoPage";
import GirlsPage from "./pages/GirlsPage";
import Footer from "./pages/Footer";
import VotingHallPage from "./pages/VotingHallPage";

function App() {

    return (
        <>
            <div className="mb-76px">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/video" element={<VideoPage/>}/>
                    <Route path="/votingHall" element={<VotingHallPage/>}/>
                    <Route path="/girls" element={<GirlsPage/>}/>
                </Routes>
            </div>

            <Footer/>
        </>
    )
}

export default App;
