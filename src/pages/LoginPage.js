import React, {useEffect} from "react";
import "./LoginPage.scss"
import {Link, useNavigate} from "react-router-dom";
import axios from "../Axios";
import register_anh from "../images/register_anh.jpg";
import auth_anh from "../images/auth-bg.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        document.getElementById("preloader").style.display = "block";

        try {
            const response = await axios.post("api/MobileAPI/login", {username, password});

            if (response.data.isSuccess) {
                localStorage.setItem('userData', JSON.stringify(response.data.data));
                setShowSuccessMessage("Đăng nhập thành công!");
                navigate(`/`);
            } else {
                setError(response.data.message || 'Đăng nhập không thành công');
            }
        } catch (error) {
            setError(error.message || 'Đăng nhập không thành công');
        }

        document.getElementById("preloader").style.display = "none";
    };


    // Effect để ẩn thông báo thành công sau 3 giây
    useEffect(() => {
        let timer;
        if (showSuccessMessage) {
            timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); // Ẩn thông báo thành công sau 3 giây
        }
        return () => clearTimeout(timer);
    }, [showSuccessMessage]);

    return (<>
        {showSuccessMessage && (<div className="success-popup">
            <p>{showSuccessMessage}</p>
        </div>)}

        {error && (<div className="error-popup">
            <p>{error}</p>
        </div>)}

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
