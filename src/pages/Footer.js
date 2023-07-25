import * as React from "react";
import "./Footer.scss"
import {Link, useLocation} from "react-router-dom";
import icHome from '../images/ic_home_act.jpg';
import icFilm from '../images/ic_film.jpg';
import icClock from '../images/ic_clock.jpg';
import icUser from '../images/ic_user.jpg';
import iconChat from '../images/chat_icon.png'

export default function Footer() {
    const location = useLocation();

    // Don't render the Footer if we're on the MessagePage.
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
                    <div className="navbar-bottom__text"><span>Sảnh chọn</span></div>
                </Link>
                <Link to="/chat" className="d-flex flex-column align-items-center navbar-bottom__link">
                    <div className="navbar-bottom__icon">
                        <img src={iconChat}
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