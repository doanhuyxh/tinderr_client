import * as React from "react";
import "./VotingHallPage.scss"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "../Axios";
import * as signalR from "@microsoft/signalr";
import vote1 from "../images/vote1.jpg"

export default function VotingHallPage() {
    const [seconds, setSeconds] = useState(60);
    const [isShow, setIsShow] = useState(false);
    const [history, setHistory] = useState([]);
    const [selectedNames, setSelectedNames] = useState([]);
    const [number, setNumber] = useState(0);
    const [numericValue, setNumericValue] = useState(0);
    const [total, setTotal] = useState(0);
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : {};

    //sửa logic nếu chon xuân thì isXuan là 1 nếu là thu thì isThu là 3
    //còn nêt ko chọn là 0 ok chua

    useEffect(() => {
        axios
            .get("api/MobileAPI/historyGame")
            .then((response) => {
                setHistory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    function showHistory() {
        setIsShow(!isShow);
    }

    const handleRectangleClick = (name) => {
        const isSelected = selectedNames.includes(name);

        if (isSelected) {
            setSelectedNames(selectedNames.filter((selectedName) => selectedName !== name));
            setNumber(number - 1);
        } else {
            setSelectedNames([...selectedNames, name]);
            setNumber(number + 1);
        }
    };

    const handleNumericChange = (event) => {
        const newValue = event.target.value;
        setNumericValue(newValue);
        const newTotal = newValue * selectedNames.length;
        setTotal(newTotal);
    };

    const rectangleClass = (name) => {
        return `wrapper ${selectedNames.includes(name) ? 'selected-wrapper' : ''}`;
    };

    const selectedNamesText = selectedNames.join(", ");

    let classNames = `popup ${isShow ? 'showModal' : ''}`;

    useEffect(() => {
        // Calculate the new total based on the numeric value and the number of selected rectangles
        const newTotal = numericValue * selectedNames.length;
        // Update the total state with the new calculated value
        setTotal(newTotal);
    }, [selectedNames, numericValue]);

    useEffect(() => {
        if (seconds === 0) {
            console.log("Countdown reached 0. Resetting...");
            setSelectedNames([]);
            setNumber(0);
            setNumericValue(0);
            setTotal(0);
        }
    }, [seconds]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://server.tinderr.id.vn/gameHub')
            .build();

        connection.start()
            .then(() => {
                console.log('SignalR connected');
            })
            .catch(error => {
                console.log('Error while connecting to SignalR:', error);
            });

        connection.on("UpdateCountDown", function (count) {
            setSeconds(count);
        });

        connection.on("CountDownFinishClient", function (item1, item2) {
            console.log("item 1: ", item1);
            console.log("item 2: ", item2);

            console.log("enteredNumericValue:", numericValue);
        });

    }, [selectedNames, numericValue]);

    return (<>
        <div className="convention-hall">
            <div className="nav-bar">
                <Link to="/" className="nav-bar__left ">
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
                <div className="nav-bar__content">Sảnh Bình Chọn</div>
            </div>

            <div className="record">
                <div className="period">
                    <div className="cover">
                        <img className="image__img"
                             src={vote1}
                             alt=""></img>h
                    </div>
                    <span className="period-number">Phiên <b>{}</b></span>
                    <div className="next-number"><span></span>
                        <div className="count-down">{formattedTime}</div>
                    </div>
                </div>
                <div className="linear-gradient"></div>
                <div className="recent">
                    <div className="kuaisan-ball">
                        <span>Phiên trước <b>2023071811310 : </b></span>
                        <span className="res-des middle" style={{color: "rgb(135, 116, 211)"}}>Thu</span>
                        <span className="res-des middle" style={{color: "rgb(239, 66, 205)"}}>Hạ</span>
                    </div>
                    <i className="fa-solid fa-chevron-down" onClick={showHistory}></i>
                </div>
            </div>
            <div className="history_popup"></div>
            <div className="wrapper">
                <div className="options-bar">
                    <div className="game">
                        <div className="tips">
                            <p className="odds m-0">【Bình chọn 1】</p>
                            <Link to="/history" className="play-tip">
                                <i className="fa-solid fa-clock-rotate-left icon"></i>
                                <span className="span-text">Lịch sử</span>
                            </Link>
                        </div>
                        <div className="linear-gradient"></div>
                        <div className="sumValueTwoSides">
                            <div className="rectangle" onClick={() => handleRectangleClick("Xuân")}>
                                <div className={rectangleClass("Xuân")}>
                                    <div className="content">
                                        <p className="name-text">Xuân</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle" onClick={() => handleRectangleClick("Hạ")}>
                                <div className={rectangleClass("Hạ")}>
                                    <div className="content">
                                        <p className="name-text">Hạ</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle" onClick={() => handleRectangleClick("Thu")}>
                                <div className={rectangleClass("Thu")}>
                                    <div className="content">
                                        <p className="name-text">Thu</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle" onClick={() => handleRectangleClick("Đông")}>
                                <div className={rectangleClass("Đông")}>
                                    <div className="content">
                                        <p className="name-text">Đông</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="bar">
                        <div className="left">
                            <div className="item">
                                <i className="jixuanico icon icon-cart-o"></i>
                                <span className="text">Lựa chọn</span>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div className="mid">
                            <span className="text">Số điểm</span>
                            <span className="text num">{user.balance}</span>
                        </div>
                        <div className="right">Bình chọn</div>
                    </div>
                    <div className="wrapper">
                        <div className="item">
                            <span className="label">Các lựa chọn hiện tại：</span>
                            <div
                                className="bet-number">{selectedNames.length > 0 ? selectedNamesText : "Không được chọn"}</div>
                            <i className="icon icon-arrow-down up"></i></div>
                        <div className="item">
                            <span className="label">Nhập Số điểm mỗi ô đặt：</span>
                            <div className="amount-wrapper">
                                <div className="cell">
                                    <div className="cell__value">
                                        <div className="field__body">
                                            <input type="tel" inputMode="numeric"
                                                   value={numericValue}
                                                   onChange={handleNumericChange}
                                                   placeholder="Nhập Số điểm"
                                                   className="field__control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="part"><span>Chọn</span>
                                <span className="number">{number}</span><span>ô</span>
                            </div>
                            <div className="part"><span>Tổng</span>
                                <span className="number">{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay"></div>
                <div className={classNames}>
                    <div className="pull-refresh">
                        <div className="pull-refresh__track">
                            <div className="pull-refresh__head"></div>
                            <div className="wrapper">
                                <div className="item">
                                    <div className="left font-weight" style={{color: "red"}}>Phiên</div>
                                    <div className="right font-weight" style={{color: "red"}}>Kết quả</div>
                                </div>
                                {/*{history.map((item, index) => (*/}
                                {/*    <div key={index} className="item">*/}
                                {/*        <div className="left font-weight">{item.wave}</div>*/}
                                {/*        <div className="right font-weight">*/}
                                {/*            <div className="kuaisan-ball left">*/}
                                {/*                {item.xuan && <span className="res-des middle">{item.xuan}</span>}*/}
                                {/*                {item.ha && <span className="res-des middle">{item.ha}</span>}*/}
                                {/*                {item.thu && <span className="res-des middle">{item.thu}</span>}*/}
                                {/*                {item.dong && <span className="res-des middle">{item.dong}</span>}*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
