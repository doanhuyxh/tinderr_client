import * as React from "react";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Banner() {
    return (
        <>
            <div className="banner">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}>
                    <SwiperSlide className="w-100">
                        <img src="https://server.tinderr.tv/banner/20230606/ed58d2afeb4024fa429ed7afd7f2d9e1.jpg"
                             className="d-block w-100" alt="Slide 1"></img>
                    </SwiperSlide>
                    <SwiperSlide className="w-100">
                        <img src="https://server.tinderr.tv/banner/20230606/eeb2bfd74f697212ae2a69e468d3122f.jpg"
                             className="d-block w-100"
                             alt="Slide 2"></img>
                    </SwiperSlide>
                    <SwiperSlide className="w-100">
                        <img src="https://server.tinderr.tv/banner/20230606/a65a6b23275bdeb1613613419a0fff68.jpg"
                             className="d-block w-100"
                             alt="Slide 3"></img>
                    </SwiperSlide>
                    <SwiperSlide className="w-100">
                        <img src="https://server.tinderr.tv/banner/20230606/5e2f31d2f39dc0f02ece059565e97cbd.jpg"
                             className="d-block w-100"
                             alt="Slide 4"></img>
                    </SwiperSlide>
                    <SwiperSlide className="w-100">
                        <img src="https://server.tinderr.tv/banner/20230606/7fba64d5aae98aa78cdc3bc49aa88850.jpg"
                             className="d-block w-100"
                             alt="Slide 5"></img>
                    </SwiperSlide>
                    <SwiperSlide className="w-100">
                        <img src="https://server.tinderr.tv/banner/20230606/f8ccbb59aee5e48bebc3ab26b6ba2760.jpg"
                             className="d-block w-100"
                             alt="Slide 5"></img>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}