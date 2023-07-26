import React from "react";
import "./LoginPage.scss"
import {Link, useNavigate} from "react-router-dom";
import axios from "../Axios";
import register_anh from "../images/register_anh.jpg";
import auth_anh from "../images/auth-bg.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("api/MobileAPI/login", {username, password})
            .then((response) => {
                if (response.data.isSuccess) {
                    localStorage.setItem('userData', JSON.stringify(response.data.data));
                    navigate(`/`);
                } else {
                    setError(response.data.message || 'Unknown error');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (<>
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
                            <p className="text-end mt-3"><span>Bạn chưa có tài khoản, </span><Link to="/register"><span>Đăng ký ngay</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
