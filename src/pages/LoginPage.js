import React, {useEffect, useState} from "react";
import "./LoginPage.scss"
import {Link, useNavigate} from "react-router-dom";
import axios from "../Axios";
import register_anh from "../images/register_anh.jpg";
import auth_anh from "../images/auth-bg.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById("preloader").style.display = 'block';
        axios
            .post("api/MobileAPI/login", { username, password })
            .then(({data} )=> {
                setShowModal(true);
                if (data.isSuccess) {
                    localStorage.setItem('userData', JSON.stringify(data.data));
                    navigate(`/`);
                } else {
                    setError('Đăng nhập không thành công');
                }
                setTimeout(() => setShowModal(false), 4000);
            })
            .catch((error) => {
                setError(error.message);
            });
        document.getElementById("preloader").style.display = 'none';
    };

    const ErrorPopup = ({error}) => {
        return <div className="error-popup"><p>{error}</p></div>;
    };

    return (<>
        {showModal && (
            <>
                {error && <ErrorPopup error={error}/>}
            </>
        )}

        <div className="login-page">
            <img src={auth_anh} className="bg-img" alt=""></img>
            <div className="bg-wrapper">
                <div className="login">
                    <div className="wrapper">
                        <div className="logo-container">
                            <div className="logo-wrapper">
                                <img src={register_anh}
                                     className="logo-img" alt="">
                                </img>
                            </div>
                        </div>
                        <div className="title-login-page">Đăng nhập</div>
                        <form className="login-form" onSubmit={handleSubmit}>
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
                            <button type="submit" className="login-btn">
                                <div className="button-content">
                                    <span className="button-text">Đăng nhập</span>
                                </div>
                            </button>
                            <p className="text-center mt-3"><span>Bạn chưa có tài khoản, </span><Link
                                to="/register"><span>Đăng ký ngay</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
