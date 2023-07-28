import * as React from "react";
import "./VideoPage.scss";
import axios from "../Axios";
import {useNavigate} from "react-router-dom";
import {baseUrlHttp} from "../Constant";

export default function VideoPage() {
    const navigate = useNavigate();
    const [dataCate, setDataCate] = React.useState([]);
    const [dataVideo, setDataVideo] = React.useState([]);
    const [selectedCategoryVideos, setSelectedCategoryVideos] = React.useState([]);
    const [showAllVideos, setShowAllVideos] = React.useState(false);
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};

    React.useEffect(() => {
        fetchData();
        handleShowAllVideos(); // Hiển thị tất cả video ban đầu
    }, []);

    const fetchData = () => {
        axios
            .get("api/MobileAPI/categoryVideo")
            .then((response) => {
                setDataCate(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("api/MobileAPI/allVideo")
            .then((response) => {
                setDataVideo(response.data.data);
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

    const handleCategoryClick = (categoryId) => {
        setShowAllVideos(false);
        const videosInCategory = dataVideo.filter((video) => video.categoryId === categoryId);
        setSelectedCategoryVideos(videosInCategory);
    };

    const handleShowAllVideos = () => {
        setShowAllVideos(true);
        setSelectedCategoryVideos([]); // Xóa danh sách video của category khi hiển thị tất cả video
    };

    return (<>
        <div className="video-page bg-light">
            <div className="navbar-container">
                <div className="container">
                    <nav className="navbar dp-navbar main-navigation" role="navigation">
                        <div className="collapse navbar-collapse" id="dp">
                            <div className="menu-homemenu-container">
                                <div className="menu-homemenu-container">
                                    <ul id="menu-menu-main" className="navbar-left">
                                        <li className="menu-item">
                                            <a title="" alt="" href="#" onClick={handleShowAllVideos}>
                                                Tất cả
                                            </a>
                                        </li>
                                        {dataCate.map((item, index) => (<li key={index} className="menu-item">
                                            <a title={item.categoryName} alt={item.categoryName} href="#"
                                               onClick={() => handleCategoryClick(item.id)}>
                                                {item.categoryName}
                                            </a>
                                        </li>))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="section-bar clearfix">
                <h3 className="section-title">
                    <span>Phim Sex</span>
                </h3>
            </div>

            <div className="hot-recommend-div">
                <div role="feed" className="list">
                    <div className="list-item">
                        {showAllVideos ? dataVideo.map((item, index) => (
                            <div key={index} className="movie-list-item" onClick={() => handleClick(item.id)}>
                                <div className="cover_img">
                                    <img src={baseUrlHttp + item.imgAvatarPath}
                                         className="image__img" alt=""/>
                                </div>
                                <div className="movie-list-item-bottom">
                                    <div className="movie-time-div">
                                        <span
                                            className="movie-time-div-title">{item.videoName}</span>
                                        <span className="movie-time-view">Xem: {item.viewCount}</span></div>
                                </div>
                            </div>)) : (selectedCategoryVideos.map((item, index) => (
                                <div key={index} className="movie-list-item" onClick={() => handleClick(item.id)}>
                                    <div className="cover_img  ">
                                        <img src={baseUrlHttp + item.imgAvatarPath}
                                             className="image__img" alt=""/>
                                    </div>
                                    <div className="movie-list-item-bottom">
                                        <div className="movie-time-div">
                                            <span
                                                className="movie-time-div-title">{item.videoName}</span>
                                            <span className="movie-time-view">Xem: {item.viewCount}</span></div>
                                    </div>
                                </div>))
                        )}
                    </div>
                    <div className="van-list__placeholder"></div>
                </div>
            </div>
        </div>
    </>);
}
