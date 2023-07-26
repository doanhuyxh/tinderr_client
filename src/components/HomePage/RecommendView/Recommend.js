import * as React from "react";
import "./Recommend.scss"
import {Link, useNavigate} from "react-router-dom";
import axios from "../../../Axios";
import {baseUrlHttp} from "../../../Constant";

export default function Recommend() {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("api/MobileAPI/videoHome")
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = (itemId) => {
        if (user && user.userName) {
            navigate(`/watch/${itemId}`);
        } else {
            navigate('/login')
        }
    };

    return (<>
        <div className="recommend">
            <div className="hot-title-div d-flex align-items-center justify-content-between">
                <div>
                    <span className="m-0 title d-flex"><b>Đề xuất</b></span>
                </div>
                <div>
                    <Link to="/video" className="d-flex align-items-center nav-link read-more">
                        Xem thêm
                        <i className="fa-solid fa-angle-right ms-1"></i>
                    </Link>
                </div>
            </div>

            <div className="recommend-item">
                <div className="movie-list__container">
                    {data.map((item, index) => (
                        <div key={index} className="movie-list__item position-relative" onClick={() => handleClick(item.id)}>
                            <div className="movie_cover position-relative d-inline-block">
                                <img
                                    className="movie-image w-100 h-100 position-absolute d-block"
                                    src={baseUrlHttp + item.imgAvatarPath}
                                    alt={item.videoName}></img>
                            </div>
                            <div className="movie-title__container">
                                <div className="movie-title__wrap">
                                    <span className="movie-title">{item.videoName}</span>
                                    <span className="movie-count-down">Xem: {item.viewCount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/video" className="text-center nav-link read-more p-3">
                    <span>Xem thêm</span>
                </Link>
            </div>
        </div>
    </>);
}