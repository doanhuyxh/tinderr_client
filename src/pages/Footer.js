import * as React from "react";
import "./Footer.scss"
import {Link, useLocation} from "react-router-dom";
import icHome from '../images/ic-home-act.jpg';
import icFilm from '../images/ic-film.jpg';
import icClock from '../images/ic-clock.jpg';
import icUser from '../images/ic-user.jpg';
import iconGirl from '../images/icon.png'

export default function Footer() {
    const location = useLocation();

    // Don't render the Footer if we're on the GirlsPage.
    if (location.pathname === '/girls' || location.pathname === '/votingHall') {
        return null;
    }

    return (<>
            <nav className="navbar-bottom d-flex w-100 bg-white position-fixed">
                <Link to="/" className="d-flex flex-column align-items-center navbar-bottom__link">
                    <div className="navbar-bottom__icon">
                        <img src={icHome}
                             alt="Trang chủ"></img>
                    </div>
                    <div className="navbar-bottom__text"><span>Trang chủ</span></div>
                </Link>
                <Link to="/votingHall" className="d-flex flex-column align-items-center navbar-bottom__link">
                    <div className="navbar-bottom__icon">
                        <img src={icClock}
                             alt="Trang chủ"></img>
                    </div>
                    <div className="navbar-bottom__text"><span>Sảnh bình chọn</span></div>
                </Link>
                <Link to="/chat" className="d-flex flex-column align-items-center navbar-bottom__link">
                    <div className="navbar-bottom__icon">
                        <img src={iconGirl}
                             alt="Trang chủ"></img>
                    </div>
                    <div className="navbar-bottom__text"><span>Chat</span></div>
                </Link>
                <Link to="/video" className="d-flex flex-column align-items-center navbar-bottom__link">
                    <div className="navbar-bottom__icon">
                        <img src={icFilm}
                             alt="Trang chủ"></img>
                    </div>
                    <div className="navbar-bottom__text"><span>Video</span></div>
                </Link>
                <Link to="/profile" className="d-flex flex-column align-items-center navbar-bottom__link">
                    <div className="navbar-bottom__icon">
                        <img src={icUser}
                             alt="Trang chủ"></img>
                    </div>
                    <div className="navbar-bottom__text"><span>Cá nhân</span></div>
                </Link>

                {/*<Link to="/login" className="nav-link d-none">Login</Link>*/}
                {/*<Link to="/register" className="nav-link">Register</Link>*/}
            </nav>
        </>
    );
}