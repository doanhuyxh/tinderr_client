import * as React from "react";
import "./ProfilePage.scss";

export default function ProfilePage() {
    const user = {
        name: 'Nguyễn Văn A',
        email: 'vanA@example.com',
        phone: '0123456789',
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Cá nhân</h1>
                    <button>Chỉnh sửa</button>
                </div>
                <div className="profile-info">
                    <h2>Thông tin cá nhân</h2>
                    <div className="info-item">
                        <strong>Họ và tên: </strong> {user.name}
                    </div>
                    <div className="info-item">
                        <strong>Email: </strong> {user.email}
                    </div>
                    <div className="info-item">
                        <strong>Số điện thoại: </strong> {user.phone}
                    </div>
                </div>
                <div className="qr-code">
                    <p>Đây là vị trí của mã QR</p>
                </div>
            </div>
        </div>
    );
}
