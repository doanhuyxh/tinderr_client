import * as React from "react";
import {useEffect} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {useLocation, useNavigate} from "react-router-dom";
import "./HomePage.scss"
import Banner from "../Component/HomePage/Banner/Banner";
import NoticeBar from "../Component/HomePage/NoticeBar/NoticeBar";
import HotGame from "../Component/HomePage/HotGame/HotGame";
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
    </>);
}
