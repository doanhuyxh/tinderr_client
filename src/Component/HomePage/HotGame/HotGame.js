import * as React from "react";
import {Link} from "react-router-dom";

export default function HotGame() {
    return (
        <>
            <div className="hot-game bg-white">
                <div className="hot-title d-flex align-items-center justify-content-between">
                    <div>
                        <span className="m-0 m title d-flex">Đề xuất</span>
                    </div>
                    <div>
                        <Link to="/profile" className="d-flex align-items-center nav-link">
                            Xem thêm
                            <i className="fa-solid fa-angle-right ms-1"></i>
                        </Link>
                    </div>
                </div>

                <div className="hot-item">
                    <div className="row">
                        <div className="col-3">
                            <div className="van-grid-item__content d-flex flex-column align-items-center">
                                <div className="game_item_img van-image">
                                    <img
                                        className="van-image__img w-100 h-100"
                                        src="https://mihuangame.oss-accelerate.aliyuncs.com/lottery/ico/20211017182015616bf8df426b4.jpg"
                                        alt="Bình chọn 1"></img>
                                </div>
                                <span>Bình chọn 1</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="van-grid-item__content d-flex flex-column align-items-center">
                                <div className="game_item_img van-image">
                                    <img
                                        className="van-image__img w-100 h-100"
                                        src="https://mihuangame.oss-accelerate.aliyuncs.com/lottery/ico/20211017182053616bf905619e1.jpg"
                                        alt="Bình chọn 2"></img>
                                </div>
                                <span>Bình chọn 1</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="van-grid-item__content d-flex flex-column align-items-center">
                                <div className="game_item_img van-image">
                                    <img
                                        className="van-image__img w-100 h-100"
                                        src="https://mihuangame.oss-accelerate.aliyuncs.com/lottery/ico/20211017182124616bf924970d1.jpg"
                                        alt="Bình chọn 3"></img>
                                </div>
                                <span>Bình chọn 1</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="van-grid-item__content d-flex flex-column align-items-center">
                                <div className="game_item_img van-image">
                                    <img
                                        className="van-image__img w-100 h-100"
                                        src="https://mihuangame.oss-accelerate.aliyuncs.com/lottery/ico/20211017182227616bf963d089b.jpg"
                                        alt="Bình chọn 4"></img>
                                </div>
                                <span>Bình chọn 1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
