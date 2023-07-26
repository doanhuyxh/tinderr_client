import * as React from 'react';
import "./RegisterPage.scss";
import {useNavigate} from "react-router-dom";
import axios from "../Axios";
import register_anh from '../images/register_anh.jpg'
import auth_anh from '../images/auth-bg.png'

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [inviteCode, setInviteCode] = React.useState("");
    const [error, setError] = React.useState(null);
    const [ip, setIp] = React.useState("");
    const [showPopup, setShowPopup] = React.useState(false);

    React.useEffect(() => {
        fetch('https://api.ipify.org/?format=json')
            .then(response => {
                return response.json();
            })
            .then(data => setIp(data.ip))
            .catch(() => setIp('0.0.0.0'));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setError("Passwords do not match.");
            return;
        }
        let passwordHash = password;
        let userName = username;

        axios
            .post("api/MobileAPI/register", {userName, passwordHash, inviteCode, ip})
            .then((response) => {
                if (response.data.isSuccess) {
                    setShowPopup(true);
                    setTimeout(() => {
                        handleSuccessClose(); // Tự động đóng popup sau 3 giây
                    }, 3000);
                } else {
                    setError('Đăng ký thất bại');
                }
            })
            .catch((error) => {
                setError(error.message);
            });

    };

    const handleBack = () => {
        navigate('/login');
    }

    const handleSuccessClose = () => {
        setShowPopup(false);
        navigate('/login');
    };

    return (<>
        {showPopup && (
            <div className="success-popup">
                <p>Đăng ký thành công!</p>
            </div>
        )}
        {error && (
            <div className="error-popup">
                <p>{error}</p>
            </div>
        )}
        <div className="register-page">
            <img src={auth_anh} className="bg-img" alt=""></img>
            <div className="bg-wrapper">
                <div className="register">
                    <div className="nav-bar-register">
                        <div className="nav-bar__content">
                            <div className="nav-bar__left" onClick={handleBack}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="logo-container">
                            <div className="logo-wrapper">
                                <img src={register_anh}
                                     className="logo-img" alt="">
                                </img>
                            </div>
                        </div>
                        <div className="title-register-page">Đăng ký</div>
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="field">
                                <div className="cell-value">
                                    <div className="field-body">
                                        <input type="text" required id="username" value={username}
                                               onChange={e => setUsername(e.target.value)} placeholder="Tên đăng nhập"
                                               className="field-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="cell-value">
                                    <div className="field-body">
                                        <input type="password" required id="password" value={password}
                                               onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu"
                                               className="field-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="cell-value">
                                    <div className="field-body">
                                        <input type="password" required id="re-password" value={rePassword}
                                               onChange={e => setRePassword(e.target.value)}
                                               placeholder="Nhập lại mật khẩu"
                                               className="field-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="cell-value">
                                    <div className="field-body">
                                        <input type="text" required id="invite-code" value={inviteCode}
                                               onChange={e => setInviteCode(e.target.value)} placeholder="Mã giới thiệu"
                                               className="field-control"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="register-btn">
                                <div className="button-content">
                                    <span className="button-text">Đăng ký</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
