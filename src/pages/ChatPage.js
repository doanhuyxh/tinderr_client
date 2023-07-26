import * as React from 'react';
import "./ChatPage.scss"
import {Link} from "react-router-dom";
import CSKH from "../images/CSKH.jpg"

export default function ChatPage() {
    let timeStamp = Date.now();
    let date = new Date(timeStamp);

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
    };

    const formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(date);

    const hours = date.getHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${formattedDate} ${amPm}`;

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
                        <Link to="/message" className="account-item text-decoration-none">
                            <img className="account-image" alt=""
                                 src={CSKH}/>
                            <div className="d-flex justify-content-between ps-2">
                                <span className="account-name">CSKH</span>
                                <span className="time">{formattedTime}</span>
                            </div>
                            <span className="message ps-2">Xin chào mừng bạn</span>
                        </Link>
                    </li>
                </ol>
            </div>
        </div>
    </>);
}