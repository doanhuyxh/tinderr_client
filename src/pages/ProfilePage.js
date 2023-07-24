import React from "react";
import "./ProfilePage.scss"
import {useNavigate} from "react-router-dom";
import userIcon from "../images/user.png"
import {baseUrlHttp} from "../Constant";
import axios from "../Axios";

export default function ProfilePage() {
    const navigate = useNavigate();
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};

    const [avatar, setAvatar] = React.useState(user.avatar || "");
    const [name, setName] = React.useState(user.name || "");
    const [bankNumber, setBankNumber] = React.useState(user.bankNumber || "");
    const [bankName, setBankName] = React.useState(user.bankName || "");

    console.log(user)

    const handleEdit = (event) => {
        event.preventDefault();

        axios
            .post("api/MobileAPI/updateUser", {name, bankNumber, bankName})
            .then((response) => {

            })
            .catch((error) => {

            });

    }

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    }

    function handleLogin() {
        navigate('/login');
    }

    return (<>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Chỉnh sửa thông tin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="profile-info">
                            <div className="info-item">
                                {/*<input type="file" onChange={e => setAvatar(e.target.files[0])}></input>*/}
                            </div>
                            <div className="info-item">
                                <strong>Họ và tên:</strong>
                                <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                            <div className="info-item">
                                <strong>Số tài khoản:</strong>
                                <input type="text" value={bankNumber} onChange={e => setBankNumber(e.target.value)}></input>
                            </div>
                            <div className="info-item">
                                <strong>Ngân hàng:</strong>
                                <input type="text" value={bankName} onChange={e => setBankName(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary" onClick={handleEdit}>Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    {user && user.userName ? (
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Chỉnh sửa</button>) : (<div></div>)}
                </div>
                <div className="profile-info">
                    <h2>Thông tin cá nhân</h2>
                    <div className="info-item">
                        <img className="avatar" src={baseUrlHttp + user.avatartPath || userIcon} alt="avatar"></img>
                    </div>
                    <div className="info-item">
                        <strong>Họ và tên: </strong> {user.name || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Số dư: </strong> {user.balance = "undefined" ? "0" : user.balance}
                    </div>
                    <div className="info-item">
                        <strong>Số tài khoản: </strong> {user.bankNumber || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Ngân hàng: </strong> {user.bankName || "N/A"}
                    </div>

                </div>
                <div className="profile-footer">
                    {user && user.userName ? (<button onClick={handleLogout}>Đăng xuất</button>) : (
                        <button onClick={handleLogin}>Đăng nhập</button>)}
                </div>
            </div>
        </div>

    </>);
}
