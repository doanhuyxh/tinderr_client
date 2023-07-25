import * as React from "react";
import './NoticeBar.scss';
import axios from "../../../Axios";

export default function NoticeBar() {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get("api/MobileAPI/notify")
            .then(response => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const content = data.map(item => item.content).join(" | ");

    return (
        <div className="notice-bar">
            <div role="alert" className="notice-swipe d-flex w-100 align-items-center">
                <i className="notice-bar__icon fa-solid fa-bullhorn"></i>
                <div role="marquee" className="notice-bar__wrap d-flex position-relative overflow-hidden align-items-center h-100">
                    <div className="notice-bar__content">
                        {content}
                    </div>
                </div>
            </div>
            <div className="linear-gradient"></div>
        </div>
    );
}
