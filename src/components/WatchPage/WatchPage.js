import React, {useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player/lazy";
import {Oval as Loader} from 'react-loader-spinner';
import {useNavigate, useParams} from "react-router-dom";
import "./WatchPage.scss"
import axios from "../../Axios";
import {baseUrlHttp} from "../../Constant";

export default function WatchPage() {
    const navigate = useNavigate();
    const {itemId} = useParams();
    let _base64 = "http://server.tinderr.id.vn";
    const [data, setData] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [base64, setBase64] = useState("")
    const [currentVideo, setCurrentVideo] = useState({
        name: "", views: ""
    });

    let userData = localStorage.getItem('userData');
    let user = userData ? JSON.parse(userData) : {};
    let flag = useRef(true);

    const [loading, setLoading] = useState(true);

    const handleReady = () => {
        setLoading(false);
    };

    useEffect(() => {
        if (flag.current) {
            flag.current = false;

            axios
                .get("api/MobileAPI/videoHome")
                .then((response) => {
                    // lấy video
                    setData(response.data.data);
                    const video = response.data.data.find((item) => item.id == itemId);
                    if (video) {
                        setCurrentVideo({
                            name: video.videoName, views: `${video.viewCount} Lượt xem`,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            axios.get(`api/MobileAPI/id/${itemId}`)
                .then(res => {
                    const dataUrl = `${_base64}${res.data.data}`;
                    setBase64(dataUrl);
                })
                .catch(error => console.log('Error:', error));

            axios
                .get(`api/MobileAPI/watchVideo?videoId=${itemId}&userId=${user.id}`)
                .then(({data}) => {
                    if (data.isSuccess) {
                        // đã nạp
                        navigate(`/watch/${itemId}`);
                    } else {
                        // chưa nạp
                        setTimeout(() => {
                            setShowModal(true);
                            document.body.style.overflow = "hidden";
                        }, 200);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleClick = (itemId) => {
        if (user && user.userName) {
            navigate(`/watch/${itemId}`);
            window.location.reload();
        } else {
            setShowModal(true)
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate(-1)
        document.body.style.overflow = "auto";
    }

    return (<>
        {showModal && <div className={`modal d-flex align-items-center ${showModal ? "fade-in" : ""}`}
                           tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title">Thông báo</h5>
                    </div>
                    <div className="modal-body text-center">
                        <p>Bạn chưa kích hoạt vip. Vui lòng liên hệ admin để kích hoạt.</p>
                    </div>
                    <div className="modal-footer w-100">
                        <button type="button" className="btn btn-primary w-100" onClick={closeModal}>OK</button>
                    </div>
                </div>
            </div>
        </div>}

        {showModal && <div className="overlay" onClick={closeModal}></div>}

        <div className="watch-page">
            <div className="video">
                <div className="video-wrapper">
                    {loading && (<div className="loader-container">
                        <Loader type="Oval" color="#00BFFF" height={50} width={50}/>
                    </div>)}
                    <ReactPlayer
                        width="100%"
                        url={base64}
                        config={{file: {forceVideo: true}}}
                        controls={true}
                        onReady={handleReady}
                    />
                </div>
            </div>

            <section className="related-movies">
                <div id="dp_related_movies-2xx" className="wrap-slider">
                    <div className="movie-content">
                        <div className="movie-descript">
                            <p>{currentVideo.name}</p>
                            <span>{currentVideo.views}</span>
                        </div>

                        <div style={{background: "#f2f2f5", height: "100vh"}}>
                            <div className="movie-body">
                                <div className="movie-title">
                                    <div>
                                        <span>Đề xuất</span>
                                    </div>
                                </div>
                                <div className="movie-list">
                                    {data.filter(x => x.id != itemId).map((item, index) => (
                                        <div key={index} className="movie-play-item"
                                             onClick={() => handleClick(item.id)}>
                                            <div className="movie-play-item-img">
                                                <img
                                                    src={baseUrlHttp + item.imgAvatarPath}
                                                    loading="lazy"
                                                    className="lazy"
                                                    alt={baseUrlHttp + item.imgAvatarPath}
                                                    width="277"
                                                    height="152"/>
                                            </div>
                                            <div className="movie-play-item-content">
                                                <p>{item.videoName}</p>
                                                <span>{item.viewCount} Lượt xem</span>
                                            </div>
                                        </div>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>);
}
