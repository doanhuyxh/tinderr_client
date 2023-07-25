import * as React from "react";
import './NoticeBar.scss';
import axios from "../../../Axios";

export default function NoticeBar() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get("api/MobileAPI/notify")
            .then(response => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (<div className="notice-bar">
        <div role="alert" className="notice-swipe d-flex w-100 align-items-center">
            <i className="notice-bar__icon fa-solid fa-bullhorn"></i>
            <div role="marquee"
                 className="notice-bar__wrap d-flex position-relative overflow-hidden align-items-center h-100">
                {data.map((item, index) => (<div key={index} className="notice-bar__content">
                    {item.content}
                </div>))}
            </div>
        </div>
        <div className="linear-gradient"></div>
    </div>);
}
