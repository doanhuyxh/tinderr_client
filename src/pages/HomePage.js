import * as React from "react";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function HomePage() {

    const navigation = useNavigate()
    let a = 0
    useEffect(()=>{
        setTimeout(function (){
            navigation("/video")
        }, 3000)
    },[a])

    return <h1>Trang chủ</h1>;
}
