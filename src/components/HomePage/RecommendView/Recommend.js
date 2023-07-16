import * as React from "react";
import "./Recommend.scss"
import {Link} from "react-router-dom";
import axios from "axios";

export default function Recommend() {
    const [data, setData] = React.useState([]); // Khởi tạo state

    React.useEffect(() => {
        // Gọi API trong useEffect
        axios.get("/api/MobileAPI/videoHome")
            .then(res => {
                console.log(res.data.data);
                setData(res.data.data); // Cập nhật state với dữ liệu trả về
            })
            .catch(e => {
                console.log(e);
            });
    }, []); // Thêm một mảng dependency rỗng để chạy useEffect chỉ một lần sau khi component được render

    return (<>
        <div className="recommend">
            <div className="hot-title-div d-flex align-items-center justify-content-between">
                <div>
                    <span className="m-0 title d-flex"><b>Đề xuất</b></span>
                </div>
                <div>
                    <Link to="/profile" className="d-flex align-items-center nav-link read-more">
                        Xem thêm
                        <i className="fa-solid fa-angle-right ms-1"></i>
                    </Link>
                </div>
            </div>

            <div className="recommend-item">
                <div className="movie-list__container">
                    {/*Item 1*/}
                    {data.map((item, index) => (
                        <div key={index} className="movie-list__item position-relative">
                            <div className="movie_cover position-relative d-inline-block">
                                <img
                                    className="movie-image w-100 h-100 position-absolute d-block"
                                    src={item.imgAvatarPath}
                                    alt={item.videoName}></img>
                            </div>
                            <div className="movie-title__container">
                                <div className="movie-title__wrap">
                                    <span className="movie-title">{item.videoName}</span>
                                    <span className="movie-count-down">Xem: 184</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="read-more text-center fz-15px p-3">Xem thêm</div>
            </div>
        </div>
    </>);
}