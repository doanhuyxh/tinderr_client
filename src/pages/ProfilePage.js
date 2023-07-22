import React from "react";
import "./ProfilePage.scss"
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate();
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};

    const handleEdit = () => {
        console.log("Edit button clicked");
    }

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <button onClick={handleEdit}>Chỉnh sửa</button>
                </div>
                <div className="profile-info">
                    <h2>Thông tin cá nhân</h2>
                    <div className="info-item">
                        <img src={user.avatartPath} alt="avatar"></img>
                    </div>
                    <div className="info-item">
                        <strong>Họ và tên: </strong> {user.name || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Số điện thoại: </strong> {user.phone || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Số tài khoản: </strong> 0123456789 - MB
                    </div>
                </div>
                <div className="profile-footer">
                    <button onClick={handleLogout}>Đăng xuất</button>
                </div>
            </div>
        </div>
    );
}
