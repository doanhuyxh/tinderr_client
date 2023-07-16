import * as React from "react";
import {Link} from "react-router-dom";
import './HotGame.scss'
import vote1 from '../../../images/vote1.jpg';
import vote2 from '../../../images/vote2.jpg';
import vote3 from '../../../images/vote3.jpg';
import vote4 from '../../../images/vote4.jpg';

export default function HotGame() {
    return (
        <>
            <div className="hot-game bg-white">
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

                <div className="hot-item">
                    <div className="d-flex">
                        <Link to="/vote1" className="col-3 hot-item__container nav-link text-dark">
                            <div className="d-flex flex-column align-items-center">
                                <div className="hot-item__wrap">
                                    <img
                                        className="hot-item__img w-100 h-100"
                                        src={vote1}
                                        alt="Bình chọn 1"></img>
                                </div>
                                <span className="hot-item__title">Bình chọn 1</span>
                            </div>
                        </Link>
                        <Link to="/vote2" className="col-3 hot-item__container nav-link text-dark">
                            <div className="d-flex flex-column align-items-center">
                                <div className="hot-item__wrap">
                                    <img
                                        className="hot-item__img w-100 h-100"
                                        src={vote2}
                                        alt="Bình chọn 2"></img>
                                </div>
                                <span className="hot-item__title">Bình chọn 2</span>
                            </div>
                        </Link>
                        <Link to="/vote3" className="col-3 hot-item__container nav-link text-dark">
                            <div className="d-flex flex-column align-items-center">
                                <div className="hot-item__wrap">
                                    <img
                                        className="hot-item__img w-100 h-100"
                                        src={vote3}
                                        alt="Bình chọn 3"></img>
                                </div>
                                <span className="hot-item__title">Bình chọn 3</span>
                            </div>
                        </Link>
                        <Link to="/vote4" className="col-3 hot-item__container nav-link text-dark">
                            <div className="d-flex flex-column align-items-center">
                                <div className="hot-item__wrap">
                                    <img
                                        className="hot-item__img w-100 h-100"
                                        src={vote4}
                                        alt="Bình chọn 4"></img>
                                </div>
                                <span className="hot-item__title">Bình chọn 4</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}
