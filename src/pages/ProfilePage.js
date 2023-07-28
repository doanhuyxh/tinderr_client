import React, {useEffect} from "react";
import "./ProfilePage.scss"
import {useNavigate} from "react-router-dom";
import userIcon from "../images/user.png"
import {baseUrlHttp} from "../Constant";
import axios from "../Axios";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState(localStorage.getItem('userData'));

    const user = userData ? JSON.parse(userData) : {};

    const [name, setName] = React.useState(user.name || "");
    const [bankNumber, setBankNumber] = React.useState(user.banknumber || "");
    const [bankName, setBankName] = React.useState(user.bankname || "");
    const [avatar, setAvatar] = React.useState(user.avatartPath || "");

    useEffect(() => {
        axios.get(`api/MobileAPI/UpdateBalace?userId=${user.id}`)
            .then(res => {
                console.log(res)
                if (res.data.isSuccess) {
                    user.balance = res.data.data;
                    localStorage.setItem("userData", JSON.stringify(user));
                    setUserData(localStorage.getItem('userData'))
                }
            })
            .catch(error => console.log('Error:', error));
    }, []);

    const handleEdit = (event) => {
        event.preventDefault();
        document.getElementById("preloader").style.display = 'block';
        let applicationUserId = user.id;

        axios
            .post("api/MobileAPI/updateUser", {applicationUserId, name, bankNumber, bankName, avatar})
            .then((response) => {
                console.log(response)
                user.name = response.data.data.name;
                user.banknumber = response.data.data.banknumber;
                user.bankname = response.data.data.bankname;
                user.avatartPath = response.data.data.avatartPath;
                localStorage.setItem("userData", JSON.stringify(user));
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    function handleLogin() {
        navigate('/login');
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (<>
        <div className={`modal fade`}
             id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
                                <strong>Ảnh đại diện:</strong>
                                <input type="file" onChange={handleImageChange} accept="image/*"></input>
                            </div>
                            <div className="info-item">
                                <strong>Họ và tên:</strong>
                                <input type="text" value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                            <div className="info-item">
                                <strong>Số tài khoản:</strong>
                                <input type="text" value={bankNumber}
                                       onChange={e => setBankNumber(e.target.value)}></input>
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
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Chỉnh sửa
                        </button>) : (<div></div>)}
                </div>
                <div className="profile-info">
                    <h2>Thông tin cá nhân</h2>
                    <div className="info-item">
                        <img
                            className="avatar"
                            src={user.avatartPath === '/upload/avatar/blank_avatar.png' ? userIcon : user.avatartPath}
                            alt="avatar">
                        </img>
                    </div>
                    <div className="info-item">
                        <strong>Họ và tên: </strong> {user.name || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Số dư: </strong> {Number(user.balance).toLocaleString() || 0}
                    </div>
                    <div className="info-item">
                        <strong>Số tài khoản: </strong> {user.banknumber || "N/A"}
                    </div>
                    <div className="info-item">
                        <strong>Ngân hàng: </strong> {user.bankname || "N/A"}
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
