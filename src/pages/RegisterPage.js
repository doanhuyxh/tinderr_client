import React, { useState, useEffect } from 'react';
import './RegisterPage.scss';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios';
import register_anh from '../images/register_anh.jpg';
import auth_anh from '../images/auth-bg.png';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [ip, setIp] = useState('');
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('https://api.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => setIp(data.ip))
            .catch(() => setIp('0.0.0.0'));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setShowModal(true);
            setMessage('Mật khẩu nhập lại không khớp');
            setTimeout(() => setShowModal(false), 4000);
            return;
        }

        const passwordHash = password;
        const userName = username;

        axios
            .post('api/MobileAPI/register', {userName, passwordHash, inviteCode, ip})
            .then(({data}) => {
                setShowModal(true);
                if (data.isSuccess && data.message === "") {
                    setMessage('Đăng ký thành công!');
                    setUsername('');
                    setPassword('');
                    setRePassword('');
                    setInviteCode('');
                } else if (data.isSuccess && data.message === "Illegal InviteCode") {
                    setMessage('Mã mời không hợp lệ, vui lòng liên hệ CSKH để được cấp mã mời.');
                } else {
                    setMessage('Tên đăng nhập đã tồn tại')
                }
                setTimeout(() => setShowModal(false), 4000);
            })
            .catch((error) => {
                setMessage('Lỗi');
            });
    };

    const handleBack = () => {
        navigate('/login');
    };

    const SuccessPopup = ({message}) => {
        return <div className="success-popup"><p>{message}</p></div>;
    };

    const ErrorPopup = ({message}) => {
        return <div className="error-popup"><p>{message}</p></div>;
    };

    return (<>
        {/* Modals */}
        {showModal && (
            <>
                {message === 'Đăng ký thành công!' && (<SuccessPopup message={message}/>)}
                {message === 'Mã mời không hợp lệ, vui lòng liên hệ CSKH để được cấp mã mời.' && (<ErrorPopup message={message}/>)}
                {message === 'Tên đăng nhập đã tồn tại' && (<ErrorPopup message={message}/>)}
                {message === 'Mật khẩu nhập lại không khớp' && <ErrorPopup message={message}/>}
                {message === 'Lỗi' && <ErrorPopup message={message}/>}
            </>
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
