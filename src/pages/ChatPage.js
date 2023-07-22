import * as React from 'react';
import "./ChatPage.scss"
import {Link} from "react-router-dom";

export default function ChatPage() {
    return (<>
        <div className="nav-bar">
            <div className="nav-bar__content">
                Chatting
            </div>
        </div>

        <div className="account-container">
            <div className="account-wall accountchooser">
                <ol className="accounts">
                    <li>
                        <Link to="/girls" className="account-item text-decoration-none">
                            <img className="account-image" alt=""
                                 src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                            <div className="d-flex justify-content-between ps-2">
                                <span className="account-name">CSKH</span>
                                <span className="time">07:14</span>
                            </div>
                            <span className="message ps-2">Xin chào mừng bạn</span>
                        </Link>
                    </li>
                </ol>
            </div>
        </div>
    </>);
}