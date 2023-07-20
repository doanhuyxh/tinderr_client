import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import {useParams} from "react-router-dom";
import "./WatchPage.scss"

export default function WatchPage({navigate}) {
    const {itemId} = useParams();
    let _base64 = "data:video/mp4;base64,";
    const [base64, setBase64] = useState(_base64)
    useEffect(() => {

        fetch(`http://scammer.click:83/api/MobileAPI/id/${itemId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const dataUrl = `data:video/mp4;base64,${data.data}`;
                setBase64(dataUrl);
            })
            .catch(error => console.log('Error:', error));

    }, []);


    return (
        <div className="watch-page">
            <div className="video">
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
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 thumb grid-item">
                            <article className="dp-item">
                                <a className="dp-thumb"
                                   href="/xem/2503/tru-mua-trong-khach-san-cung-xzirq"
                                   title="Trú mưa trong khách sạn cùng sếp nữ dâm đãng">
                                    <figure>
                                        <img
                                            src="https://img-99.w3img.com/images_new/mini_6_size/F9iQbotN-P42uYHce_Zlg3MIGqxXAyB6SkT.jpg"
                                            className="lazy" alt="Trú mưa trong khách sạn cùng sếp nữ dâm đãng"
                                            title="Trú mưa trong khách sạn cùng sếp nữ dâm đãng" width="277"
                                            height="152"></img>
                                    </figure>
                                    <div className="icon_overlay"></div>
                                </a>
                                <div className="dp-post-title-box">
                                    <div className="dp-post-title">
                                        <h2 className="entry-title">
                                            <a
                                                href="/xem/2503/tru-mua-trong-khach-san-cung-xzirq"
                                                title="Trú mưa trong khách sạn cùng sếp nữ dâm đãng"> Trú mưa trong
                                                khách
                                                sạn
                                                cùng sếp nữ dâm đãng</a>
                                        </h2>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 thumb grid-item">
                            <article className="dp-item">
                                <a className="dp-thumb"
                                   href="/xem/2503/tru-mua-trong-khach-san-cung-xzirq"
                                   title="Trú mưa trong khách sạn cùng sếp nữ dâm đãng">
                                    <figure>
                                        <img
                                            src="https://img-99.w3img.com/images_new/mini_6_size/F9iQbotN-P42uYHce_Zlg3MIGqxXAyB6SkT.jpg"
                                            className="lazy" alt="Trú mưa trong khách sạn cùng sếp nữ dâm đãng"
                                            title="Trú mưa trong khách sạn cùng sếp nữ dâm đãng" width="277"
                                            height="152"></img>
                                    </figure>
                                    <div className="icon_overlay"></div>
                                </a>
                                <div className="dp-post-title-box">
                                    <div className="dp-post-title">
                                        <h2 className="entry-title">
                                            <a
                                                href="/xem/2503/tru-mua-trong-khach-san-cung-xzirq"
                                                title="Trú mưa trong khách sạn cùng sếp nữ dâm đãng"> Trú mưa trong
                                                khách
                                                sạn
                                                cùng sếp nữ dâm đãng</a>
                                        </h2>
                                    </div>
                                </div>
                            </article>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
