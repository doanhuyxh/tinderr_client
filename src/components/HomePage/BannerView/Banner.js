import * as React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Banner.scss'
import {EffectCoverflow, Pagination} from 'swiper/modules';
import {baseUrlHttp, baseUrlHttps, baseUrlHttpApi, baseUrlHttpsApi} from "../../../Constant";
import axios from "../../../Axios";

export default function Banner() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get("api/MobileAPI/banner")
            .then(response => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


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
                {data.map((item, index) => (
                    <SwiperSlide key={index} className="w-80 banner-image__wrap">
                        <img src={baseUrlHttp + item.path}
                             className="d-block w-100 banner-image" alt={"Slide" + index}></img>
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>
    </>);
}