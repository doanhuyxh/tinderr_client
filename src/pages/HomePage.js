import * as React from "react";
import {useEffect} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {useLocation, useNavigate} from "react-router-dom";
import "./HomePage.scss"
import Banner from "../components/HomePage/BannerView/Banner";
import NoticeBar from "../components/HomePage/NoticeBarView/NoticeBar";
import HotGame from "../components/HomePage/HotGameView/HotGame";
import Popular from "../components/HomePage/PopularView/Popular"
import Recommend from "../components/HomePage/RecommendView/Recommend";

export default function HomePage() {
    //   const navigation = useNavigate();
    //   let a = 0;
    //   useEffect(() => {
    //     setTimeout(function () {
    //       navigation("/video");
    //     }, 3000);
    //   }, [a]);

    return (<>
        <Banner/>

        <NoticeBar/>

        <HotGame/>

        <Popular/>

        <Recommend/>
    </>);
}
