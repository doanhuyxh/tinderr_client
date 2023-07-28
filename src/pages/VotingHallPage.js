import React, {useEffect, useState, useMemo} from "react";
import {Link} from "react-router-dom";
import axios from "../Axios";
import * as signalR from "@microsoft/signalr";
import vote1 from "../images/vote1.jpg";
import "./VotingHallPage.scss"

export default function VotingHallPage() {
// khởi tạo các state
    const [history, setHistory] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [totalPoint, setTotalPont] = useState(0);
    const [XuanHaThuDong, SetXuanHaThuDong] = useState([0, 0, 0, 0]);
    const [countDown, setCountDown] = useState(0);
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : {};

    function showHistory() {
        setIsShow(!isShow);
    }

    let classNames = `popup ${isShow ? 'showModal' : ''}`;

    const calculatedTotal = totalPoint * XuanHaThuDong.filter(x => x > 0).length;

    // const [hubConnection, setHubConnection] = useState(null);
    useEffect(() => {
        axios
            .get("api/MobileAPI/historyGame")
            .then((response) => {
                setHistory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44349/gameHub").build();
        connection
            .start()
            .then(() => {
                console.log("SignalR connected");
            })
            .catch((error) => {
                console.log("Error while connecting to SignalR:", error);
            });

        connection.on("UpdateCountDown", function (count) {
            setCountDown(count);
        });

        connection.on("CountDownFinishClient", function (item1, item2) {
            console.clear();
            console.log("item 1: ", item1);
            console.log("item 2: ", item2);
            console.log("enteredNumericValue:", totalPoint);
            console.log("calculatedTotal:", calculatedTotal);
            console.log("XuanHaThuDong:", XuanHaThuDong);

            // viết logic để tính toán
            const selectedCount = XuanHaThuDong.filter((x) => x > 0).length;
            switch (selectedCount) {
                case 4:
                    console.log("4 chọn - 2 trúng");
                    break;

                case 3:
                    if (XuanHaThuDong.includes(item1) && XuanHaThuDong.includes(item2)) {
                        console.log("3 chọn - 2 trúng");
                    } else if (XuanHaThuDong.includes(item1) || XuanHaThuDong.includes(item2)) {
                        console.log("3 chọn - 1 trúng");
                    }
                    break;

                case 2:
                    if (XuanHaThuDong.includes(item1) && XuanHaThuDong.includes(item2)) {
                        console.log("2 chọn - 2 trúng");
                    } else if (XuanHaThuDong.includes(item1) || XuanHaThuDong.includes(item2)) {
                        console.log("2 chọn - 1 trúng");
                    } else {
                        console.log("2 chọn - 0 trúng");
                    }
                    break;

                case 1:
                    if (XuanHaThuDong.includes(item1) || XuanHaThuDong.includes(item2)) {
                        console.log("1 chọn - 1 trúng");
                    } else {
                        console.log("1 chọn - 0 trúng");
                    }
                    break;

                default:
                    console.log("Không có chọn nào - 0 trúng");
            }

            SetXuanHaThuDong([0, 0, 0, 0]);
            setTotalPont(0);

        });

        //setHubConnection(connection)

        return () => {
            if (connection) {
                connection.stop();
            }
        }

    }, [XuanHaThuDong, totalPoint]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    function handleVote() {
        // Get the number of selected items
        const selectedCount = XuanHaThuDong.filter(x => x > 0).length;

        if (selectedCount === 0) {
            // If no items are selected, show an error message or take any appropriate action.
            alert("Bạn phải chọn ít nhất 1 lựa chọn để bình chọn!");
            return;
        }

        if (totalPoint === 0) {
            // If totalPoint is 0, show an error message or take any appropriate action.
            alert("Bạn phải nhập số điểm để bình chọn!");
            return;
        }

        // Calculate the result based on the selected items and totalPoint
        const calculatedTotal = totalPoint * selectedCount;

        console.log(calculatedTotal)
        console.log(SetXuanHaThuDong)

        // Update the state with the calculatedTotal and reset XuanHaThuDong and totalPoint
        setTotalPont(0);
        SetXuanHaThuDong([0, 0, 0, 0]);

        // Optionally, you can send the voting data to the server using Axios or SignalR here.
        // For example:
        // axios.post("api/MobileAPI/submitVote", {
        //   selectedItems: XuanHaThuDong.filter(x => x > 0),
        //   totalPoint: calculatedTotal
        // }).then((response) => {
        //   // Handle the response from the server if needed.
        // }).catch((error) => {
        //   console.log(error);
        // });
    }

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
                             alt=""></img>
                    </div>
                    <span className="period-number">Phiên <b>{}</b></span>
                    <div className="next-number"><span></span>
                        <div className="count-down">{formatTime(countDown)}</div>
                    </div>
                </div>
                <div className="linear-gradient"></div>
                <div className="recent">
                    <div className="kuaisan-ball">
                        <span>Phiên trước <b>{history.length > 0 ? history[0]?.wave : ""}: </b></span>
                        <span className="res-des middle"
                              style={{color: "rgb(135, 116, 211)"}}>{history.length > 0 ? history[0]?.item1 : ""} </span>
                        <span className="res-des middle"
                              style={{color: "rgb(239, 66, 205)"}}>{history.length > 0 ? history[0]?.item2 : ""}</span>
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
                        </div>
                        <div className="linear-gradient"></div>
                        <div className="sumValueTwoSides">
                            <div className="rectangle"
                                 onClick={() => {
                                     let newArray = [...XuanHaThuDong];
                                     if (newArray[0] == 0) {
                                         newArray[0] = 1
                                     } else {
                                         newArray[0] = 0
                                     }
                                     SetXuanHaThuDong(newArray)
                                 }}>
                                <div className={XuanHaThuDong[0] == 1 ? "selected-wrapper wrapper" : "wrapper"}>
                                    <div className="content">
                                        <p className="name-text">Xuân</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle"
                                 onClick={() => {
                                     let newArray = [...XuanHaThuDong];
                                     if (newArray[1] == 0) {
                                         newArray[1] = 2
                                     } else {
                                         newArray[1] = 0
                                     }
                                     SetXuanHaThuDong(newArray)
                                 }}>
                                <div className={XuanHaThuDong[1] == 2 ? "selected-wrapper wrapper" : "wrapper"}>
                                    <div className="content">
                                        <p className="name-text">Hạ</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle"
                                 onClick={() => {
                                     let newArray = [...XuanHaThuDong];
                                     if (newArray[2] == 0) {
                                         newArray[2] = 3
                                     } else {
                                         newArray[2] = 0
                                     }
                                     SetXuanHaThuDong(newArray)
                                 }}>
                                <div className={XuanHaThuDong[2] == 3 ? "selected-wrapper wrapper" : "wrapper"}>
                                    <div className="content">
                                        <p className="name-text">Thu</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle"
                                 onClick={() => {
                                     let newArray = [...XuanHaThuDong];
                                     if (newArray[3] == 0) {
                                         newArray[3] = 4
                                     } else {
                                         newArray[3] = 0
                                     }
                                     SetXuanHaThuDong(newArray)
                                 }}>
                                <div className={XuanHaThuDong[3] == 4 ? "selected-wrapper wrapper" : "wrapper"}>
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
                            <span className="text num">{Number(user.balance).toLocaleString() || 0}</span>
                        </div>
                        <div className="right" onClick={handleVote}>Bình chọn</div>
                    </div>
                    <div className="wrapper">
                        <div className="item">
                            <span className="label">Các lựa chọn hiện tại：</span>
                            <div className="bet-number">
                                {XuanHaThuDong
                                    .filter((x) => x > 0)
                                    .map((value) => {
                                        switch (value) {
                                            case 1:
                                                return "Xuân";
                                            case 2:
                                                return "Hạ";
                                            case 3:
                                                return "Thu";
                                            case 4:
                                                return "Đông";
                                            default:
                                                return "";
                                        }
                                    })
                                    .join(", ") || "Chưa được chọn"}
                            </div>
                            <i className="icon icon-arrow-down up"></i></div>
                        <div className="item">
                            <span className="label">Nhập Số điểm mỗi ô đặt：</span>
                            <div className="amount-wrapper">
                                <div className="cell">
                                    <div className="cell__value">
                                        <div className="field__body">
                                            <input type="tel" inputMode="numeric"
                                                   value={totalPoint == 0 ? "" : totalPoint}
                                                   onChange={(event) => {
                                                       setTotalPont(event.target.value)
                                                   }}
                                                   placeholder="Nhập Số điểm"
                                                   className="field__control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="part"><span>Chọn</span>
                                <span className="number">{XuanHaThuDong.filter(x => x > 0).length}</span><span>ô</span>
                            </div>
                            <div className="part"><span>Tổng</span>
                                <span className="number">{Number(calculatedTotal).toLocaleString()}</span>
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
                                {history.map((item, index) => (<div key={index} className="item">
                                        <div className="left font-weight ms-2">{item.wave}</div>
                                        <div className="right font-weight">
                                            <div className="kuaisan-ball left">
                                                {item.item1 && <span className="res-des middle">{item.item1} </span>}
                                                {item.item2 && <span className="res-des middle">{item.item2}</span>}
                                            </div>
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
