import * as React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Banner.scss'
import {EffectCoverflow, Pagination} from 'swiper/modules';
import anh1 from '../../../images/anh1.jpg';
import anh2 from '../../../images/anh2.jpg';
import anh3 from '../../../images/anh3.jpg';
import anh4 from '../../../images/anh4.jpg';
import anh5 from '../../../images/anh5.jpg';
import anh6 from '../../../images/anh6.jpg';

export default function Banner() {
    return (<>
        <div className="banner">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper">
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src={anh4}
                         className="d-block w-100 banner-image" alt="Slide 1"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src={anh5}
                         className="d-block w-100 banner-image"
                         alt="Slide 2"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src={anh3}
                         className="d-block w-100 banner-image"
                         alt="Slide 3"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src={anh1}
                         className="d-block w-100 banner-image"
                         alt="Slide 4"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src={anh2}
                         className="d-block w-100 banner-image"
                         alt="Slide 5"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src={anh6}
                         className="d-block w-100 banner-image"
                         alt="Slide 5"></img>
                </SwiperSlide>
            </Swiper>
        </div>
    </>);
}