import * as React from "react";
import './NoticeBar.scss';

export default function NoticeBar() {
    return (
        <div className="notice-bar">
            <div role="alert" className="notice-swipe d-flex w-100 align-items-center">
                <i className="notice-bar__icon fa-solid fa-bullhorn"></i>
                <div role="marquee"
                     className="notice-bar__wrap d-flex position-relative overflow-hidden align-items-center h-100">
                    <div className="notice-bar__content">
                        Chào mừng đến với Động Gái !----Sẽ đưa bạn vào trạng thái cực khoái---- an toàn của bạn! Các
                        bước hẹn hò： liên hệ lễ tân---chọn cô gái---hoàn thành nhiệm vụ----Tự do quan hệ tình dục trong
                        cùng một thành phố!
                    </div>
                </div>
            </div>
            <div className="linear-gradient"></div>
        </div>
    );
}
