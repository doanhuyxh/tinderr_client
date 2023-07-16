import * as React from "react";
import "./Footer.scss"
import {Link} from "react-router-dom";

export default function Footer() {
    return (<>
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

    </>);
}