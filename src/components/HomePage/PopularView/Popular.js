import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import './Popular.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import no1 from '../../../images/no1.png';
import no2 from '../../../images/no2.png';
import no3 from '../../../images/no3.png';
import axios from "../../../Axios";
import {baseUrlHttp} from "../../../Constant";

export default function Popular() {
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
        <div className="popular">
            <div className="hot-title-div d-flex align-items-center justify-content-between">
                <div>
                    <span className="m-0 title d-flex"><b>Phổ biến</b></span>
                </div>
                <div>
                    <Link to="/video" className="d-flex align-items-center nav-link read-more">
                        Xem thêm
                        <i className="fa-solid fa-angle-right ms-1"></i>
                    </Link>
                </div>
            </div>

            <div className="popular-item">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    modules={[Pagination]}
                    className="mySwiper">
                    {data.map((item, index) => (
                        <SwiperSlide key={index} className="swiper-slide h-100 position-relative">
                            <div onClick={() => handleClick(item.id)}>
                                <div className="movie_cover position-relative d-inline-block">
                                    <img
                                        className="movie-image w-100 h-100 position-absolute d-block"
                                        src={baseUrlHttp + item.imgAvatarPath} // Sử dụng imgAvatarPath từ dữ liệu API
                                        alt={item.videoName} // Sử dụng videoName từ dữ liệu API
                                    />
                                </div>
                                <img src={index === 0 ? no1 : index === 1 ? no2 : index === 2 ? no3 : ""}
                                     className="hot position-absolute"
                                     alt=""></img>
                                <div className="movie-title__container position-relative">
                                    <div
                                        className="movie-title__wrap w-100 d-flex align-items-center justify-content-between text-white">
                                        <span className="movie-title">{item.videoName}</span>
                                        <div className="movie-count-down">{item.viewCount} lượt xem</div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>))}
                </Swiper>
            </div>
        </div>
    </>);
}