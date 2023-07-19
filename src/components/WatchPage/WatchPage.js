import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import {useParams} from "react-router-dom";

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
            <ReactPlayer width='100%' url={base64} controls={true}/>
        </div>
    );
}
