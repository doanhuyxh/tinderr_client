import * as React from "react";
import {Link} from "react-router-dom";
import './Popular.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import no1 from '../../../images/no1.png';
import no2 from '../../../images/no2.png';
import no3 from '../../../images/no3.png';

export default function Popular() {
    return (<>
        <div className="popular">
            <div className="hot-title-div d-flex align-items-center justify-content-between">
                <div>
                    <span className="m-0 title d-flex"><b>Phổ biến</b></span>
                </div>
                <div>
                    <Link to="/profile" className="d-flex align-items-center nav-link read-more">
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
                    <SwiperSlide className="swiper-slide h-100 position-relative">
                        <div className="movie_cover position-relative d-inline-block">
                            <img
                                className="movie-image w-100 h-100 position-absolute d-block" src="https://fmlb.netlbtu.com/20211006/AKYZN2Jg/1.jpg"
                                alt=""></img>
                        </div>
                        <img src={no1} className="hot position-absolute" alt=""></img>
                        <div className="movie-title__container position-relative">
                            <div className="movie-title__wrap w-100 d-flex align-items-center justify-content-between text-white">
                                <span className="movie-title">扒开衣物舔乳口交撅臀疯狂抽插騷穴，手扣喷水。</span>
                                <div className="movie-count-down">00:18:11</div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide h-100 position-relative">
                        <div className="movie_cover position-relative d-inline-block">
                            <img
                                className="movie-image w-100 h-100 position-absolute d-block" src="https://fmlb.netlbtu.com/20211006/AKYZN2Jg/1.jpg"
                                alt=""></img>
                        </div>
                        <img src={no2} className="hot position-absolute" alt=""></img>
                        <div className="movie-title__container position-relative">
                            <div className="movie-title__wrap w-100 d-flex align-items-center justify-content-between text-white">
                                <span className="movie-title">扒开衣物舔乳口交撅臀疯狂抽插騷穴，手扣喷水。</span>
                                <div className="movie-count-down">00:18:11</div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide h-100 position-relative">
                        <div className="movie_cover position-relative d-inline-block">
                            <img
                                className="movie-image w-100 h-100 position-absolute d-block" src="https://fmlb.netlbtu.com/20211006/AKYZN2Jg/1.jpg"
                                alt=""></img>
                        </div>
                        <img src={no3} className="hot position-absolute" alt=""></img>
                        <div className="movie-title__container position-relative">
                            <div className="movie-title__wrap w-100 d-flex align-items-center justify-content-between text-white">
                                <span className="movie-title">扒开衣物舔乳口交撅臀疯狂抽插騷穴，手扣喷水。</span>
                                <div className="movie-count-down">00:18:11</div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>

    </>);
}