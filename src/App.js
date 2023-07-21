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
import WatchPage from "./components/WatchPage/WatchPage";

function App() {

    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/video" element={<VideoPage/>}/>
                    <Route path="/votingHall" element={<VotingHallPage/>}/>
                    <Route path="/girls" element={<GirlsPage/>}/>
                    <Route path="/watch/:itemId" element={<WatchPage />} />
                </Routes>
            </div>

            <Footer/>
        </>
    )
}

export default App;
