import React, {useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player";
import {useNavigate, useParams} from "react-router-dom";
import "./WatchPage.scss"
import axios from "../../Axios";
import {baseUrlHttp} from "../../Constant";

export default function WatchPage() {
    const navigate = useNavigate();
    const {itemId} = useParams();
    let _base64 = "data:video/mp4;base64,";
    const [data, setData] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [base64, setBase64] = useState(_base64)
    let userData = localStorage.getItem('userData');
    let user = userData ? JSON.parse(userData) : {};
    let flag = useRef(true);

    useEffect(() => {
        if (flag.current) {
            flag.current = false;

            axios
                .get("api/MobileAPI/videoHome")
                .then((response) => {
                    // lấy video
                    setData(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios.get(`api/MobileAPI/id/${itemId}`)
                .then(res => {
                    const dataUrl = `data:video/mp4;base64,${res.data.data}`;
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
            <div className="video bg-dark">
                <ReactPlayer width='100%' url={base64} controls={true}/>
            </div>

            <section className="related-movies">
                <div id="dp_related_movies-2xx" className="wrap-slider">
                    <div className="section-bar clearfix">
                        <h3 className="section-title">
                            <span>Phim Sex Đề Xuất</span>
                        </h3>
                    </div>
                    <div className="dp_box">
                        {data.filter(x => x.id != itemId).map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-3 col-sm-3 col-xs-6 thumb grid-item"
                                 onClick={() => handleClick(item.id)}>
                                <article className="dp-item">
                                    <div className="dp-thumb" title={item.videoName}>
                                        <figure>
                                            <img
                                                src={baseUrlHttp + item.imgAvatarPath}
                                                className="lazy" alt=""
                                                width="277"
                                                height="152">
                                            </img>
                                        </figure>
                                    </div>
                                    <div className="dp-post-title-box">
                                        <div className="dp-post-title">
                                            <h2 className="entry-title">
                                                <span>{item.videoName}</span>
                                            </h2>
                                        </div>
                                    </div>
                                </article>
                            </div>))}
                    </div>
                </div>
            </section>
        </div>
    </>);
}
