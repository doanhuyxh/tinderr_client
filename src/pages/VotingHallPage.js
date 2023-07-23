import * as React from "react";
import "./VotingHallPage.scss"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as signalR from "@microsoft/signalr";

export default function VotingHallPage() {

    const [isShow, setIsShow] = useState(false);

    function showHistory() {
        setIsShow(!isShow);
    }

    const [hubConnection, setHubConnection] = useState(null);
    useEffect(() => {
        const startConnection = async () => {
            try {
                // Create a connection to the SignalR Hub
                let connection = new signalR.HubConnectionBuilder()
                    .withUrl('https://localhost:44349/gameHub')
                    .build();
                // Start the connection
                await connection.start();
                setHubConnection(connection);

                console.log('SignalR connected');

                connection.invoke("JoinRandomGame")

                connection.on("GameStarted", function (mes){
                    alert(mes)
                })


            } catch (error) {
                console.log('Error while connecting to SignalR:', error);
            }
        };

        startConnection();

        return () => {
            // Clean up the connection when the component unmounts
            if (hubConnection) {
                hubConnection.stop();
            }
        };
    }, []);

    let classNames = `popup ${isShow ? 'showModal' : ''}`;

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
                             src="http://mihuangame.oss-accelerate.aliyuncs.com/lottery/ico/20211017182015616bf8df426b4.jpg"
                             alt=""></img>
                    </div>
                    <span className="period-number">Phiên <b>2023071811311</b></span>
                    <div className="next-number"><span></span>
                        <div className="count-down">00:00:58</div>
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
                            <div className="play-tip">
                                <i className="fa-solid fa-circle-info icon"></i>
                                <span className="span-text">Lịch sử</span>
                            </div>
                        </div>
                        <div className="linear-gradient"></div>
                        <div className="sumValueTwoSides">
                            <div className="rectangle">
                                <div className="wrapper">
                                    <div className="content">
                                        <p className="name-text">Xuân</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle">
                                <div className="wrapper">
                                    <div className="content">
                                        <p className="name-text">Hạ</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle">
                                <div className="wrapper">
                                    <div className="content">
                                        <p className="name-text">Thu</p>
                                        <p className="odd-text">1.90</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rectangle">
                                <div className="wrapper">
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
                            <span className="text num">0,1</span>
                        </div>
                        <div className="right">Bình chọn</div>
                    </div>
                    <div className="wrapper">
                        <div className="item">
                            <span className="label">Các lựa chọn hiện tại：</span>
                            <div className="bet-number">Không được chọn</div>
                            <i className="icon icon-arrow-down up"></i></div>
                        <div className="item">
                            <span className="label">Nhập Số điểm mỗi ô đặt：</span>
                            <div className="amount-wrapper">
                                <div className="cell">
                                    <div className="cell__value">
                                        <div className="field__body">
                                            <input type="tel" inputMode="numeric"
                                                   placeholder="Nhập Số điểm"
                                                   className="field__control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="part"><span>Chọn</span>
                                <span className="number">0</span><span>ô</span>
                            </div>
                            <div className="part"><span>Tổng</span>
                                <span className="number">0</span>
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
                                <div className="item">
                                    <div className="left font-weight">2023071811327</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811326</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811325</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Xuân</span><span
                                            className="res-des middle">Xuân</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811324</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811324</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Xuân</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811323</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Xuân</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811322</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811321</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811320</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Đông</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811319</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811318</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Đông</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811317</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Xuân</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811316</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811315</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Xuân</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811314</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811313</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811312</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811311</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Thu</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811310</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Thu</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811309</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Thu</span><span
                                            className="res-des middle">Xuân</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811308</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811308</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811307</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811306</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811305</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Thu</span><span
                                            className="res-des middle">Xuân</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811304</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Xuân</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811303</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Thu</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811302</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Xuân</span><span
                                            className="res-des middle">Đông</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811301</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Hạ</span><span
                                            className="res-des middle">Hạ</span></div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="left font-weight">2023071811300</div>
                                    <div className="right font-weight">
                                        <div className="kuaisan-ball left"><span
                                            className="res-des middle">Đông</span><span
                                            className="res-des middle">Đông</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
