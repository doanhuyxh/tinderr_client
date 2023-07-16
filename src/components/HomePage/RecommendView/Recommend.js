import * as React from "react";
import "./Recommend.scss"
import {Link} from "react-router-dom";

export default function Recommend() {
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
                    <div className="movie-list__item position-relative">
                        <div className="movie_cover position-relative d-inline-block">
                            <img
                                className="movie-image w-100 h-100 position-absolute d-block"
                                src="https://fmlb.netlbtu.com/20210727/Ap7oV6TI/1.jpg"
                                alt=""></img>
                        </div>
                        <div className="movie-title__container">
                            <div className="movie-title__wrap">
                                <span className="movie-title">如何制作自制色情片：第一部分-mic_alice_darla_kf011215_720p_8000第01集</span>
                                <span className="movie-count-down">Xem: 184</span>
                            </div>
                        </div>
                    </div>
                    {/*Item 2*/}
                    <div className="movie-list__item position-relative">
                        <div className="movie_cover position-relative d-inline-block">
                            <img
                                className="movie-image w-100 h-100 position-absolute d-block"
                                src="https://fmlb.netlbtu.com/20210727/Ap7oV6TI/1.jpg"
                                alt=""></img>
                        </div>
                        <div className="movie-title__container">
                            <div className="movie-title__wrap">
                                <span className="movie-title">如何制作自制色情片：第一部分-mic_alice_darla_kf011215_720p_8000第01集</span>
                                <span className="movie-count-down">Xem: 184</span>
                            </div>
                        </div>
                    </div>
                    {/*Item ...*/}

                </div>

                <div className="read-more text-center fz-15px p-3">Xem thêm</div>
            </div>
        </div>
    </>);
}