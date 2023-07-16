import * as React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Banner.scss'

import {EffectCoverflow, Pagination} from 'swiper/modules';

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
                    <img src="https://server.tinderr.tv/banner/20230606/ed58d2afeb4024fa429ed7afd7f2d9e1.jpg"
                         className="d-block w-100 banner-image" alt="Slide 1"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src="https://server.tinderr.tv/banner/20230606/eeb2bfd74f697212ae2a69e468d3122f.jpg"
                         className="d-block w-100 banner-image"
                         alt="Slide 2"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src="https://server.tinderr.tv/banner/20230606/a65a6b23275bdeb1613613419a0fff68.jpg"
                         className="d-block w-100 banner-image"
                         alt="Slide 3"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src="https://server.tinderr.tv/banner/20230606/5e2f31d2f39dc0f02ece059565e97cbd.jpg"
                         className="d-block w-100 banner-image"
                         alt="Slide 4"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src="https://server.tinderr.tv/banner/20230606/7fba64d5aae98aa78cdc3bc49aa88850.jpg"
                         className="d-block w-100 banner-image"
                         alt="Slide 5"></img>
                </SwiperSlide>
                <SwiperSlide className="w-80 banner-image__wrap">
                    <img src="https://server.tinderr.tv/banner/20230606/f8ccbb59aee5e48bebc3ab26b6ba2760.jpg"
                         className="d-block w-100 banner-image"
                         alt="Slide 5"></img>
                </SwiperSlide>
            </Swiper>
        </div>
    </>);
}