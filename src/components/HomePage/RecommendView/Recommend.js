import * as React from "react";
import "./Recommend.scss"
import {Link, useNavigate} from "react-router-dom";
import axios from "../../../Axios";

export default function Recommend() {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("/api/MobileAPI/videoHome")
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = (itemId) => {
        navigate(`/watch/${itemId}`);
    };

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
                        <div key={index} className="movie-list__item position-relative" onClick={() => handleClick(item.id)}>
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

                <Link to="/profile" className="text-center nav-link read-more p-3">
                    <span>Xem thêm</span>
                </Link>
            </div>
        </div>
    </>);
}