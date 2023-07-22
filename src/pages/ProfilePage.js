import React from "react";
import "./ProfilePage.scss"
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate();
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};
    console.log(user)

    const handleEdit = () => {
        console.log("Edit button clicked");
    }

    const handleLogout = () => {
        localStorage.removeItem('userData');
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
                                <input type="file"></input>
                            </div>
                            <div className="info-item">
                                <strong>Họ và tên:</strong>
                                <input type="text"></input>
                            </div>
                            <div className="info-item">
                                <strong>Số điện thoại:</strong>
                                <input type="text"></input>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <button type="button" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" onClick={handleEdit}>
                        Chỉnh sửa
                    </button>
                </div>
                <div className="profile-info">
                    <h2>Thông tin cá nhân</h2>
                    <div className="info-item">
                        <img src={user.avatartPath} alt="avatar"></img>
                    </div>
                    <div className="info-item">
                        <strong>Họ và tên: </strong> {user.userName || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Số điện thoại: </strong> {user.phone || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Số dư: </strong> {user.balance.toString() + " VNĐ" || "N/A"}
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

    </>);
}
