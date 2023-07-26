import * as React from "react";
import {Link} from "react-router-dom";
import "./MessagePage.scss"
import * as signalR from '@microsoft/signalr';
import {useRef, useState, useEffect} from "react";
import {baseUrlHttp} from "../Constant";
import CSKH from "../images/CSKH.jpg"

export default function MessagePage() {
    let userSave = localStorage.getItem("userName");
    let userLogin = localStorage.getItem("userData");
    let userClient;
    if (userLogin) {
        userSave = JSON.parse(userLogin).userName;
    }
    if (userSave === null || userSave === undefined) {
        let _user = "user_" + Math.random().toFixed(8) * 100;
        localStorage.setItem("userName", _user);
        fetch(`${baseUrlHttp}Chat/SaveOtherUser?name=${localStorage.getItem("userName")}`)
        userClient = localStorage.getItem("userName");
    }
    userClient = userSave;
    console.log("User Client", userClient);
    const [messages, setMessages] = useState([]);
    const connectionRef = useRef(null);
    const chatBodyRef = useRef(null);
    const mes = useRef(null);

    const handleMessage = async () => {
        await connectionRef.current.invoke("SendMessage", userClient, mes.current.value)
        mes.current.value = "";
    }

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            handleMessage()
        }
    }

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://test.tinderr.id.vn/chatHub')
            .build();
        connection.start()
            .then(() => {
                console.log('SignalR connected');
                connection.invoke("HistoryChat", userClient).then(r => {
                    console.log("r", r)
                });
            })
            .catch(error => {
                console.log('Error while connecting to SignalR:', error);
            });

        connection.on("ReceiveMessageToUser", function (user, adminChat, message) {
            console.log("message", message, adminChat);
            if (userClient == user) {
                setMessages((prevListMes) => [...prevListMes, {user, message}]);
            }
        })

        connection.on("ReceiveMessageToAdmin", function (user, adminChat, message) {
            if (userClient == user) {
                setMessages((prevListMes) => [...prevListMes, {adminChat, message}]);
            }
        })

        connection.on("ReceiveMessageHistoryToUser", function (user, history) {
            console.log('history---', history);
            const newMessages = [];
            for (let i = 0; i < history.length; i++) {
                const item = history[i];
                newMessages.push({
                    key: i, user: item.fromUser, message: item.content
                })
            }
            console.log('newMessages---', newMessages);
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        });

        connectionRef.current = connection;

        return () => {
            // Clean up the connection when the component unmounts
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    function handleFile() {

    }

    return (<>
        <div className="chat">
            <div className="nav-bar">
                <Link to="/chat" className="nav-bar__left">
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
                <div className="nav-bar__content">
                    Chatting
                </div>
            </div>

            <div className="chat-screen">
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((item, index) => {
                        if (item.user === userClient) {
                            return (<div className="chat-bubble me" key={index}>{item.message}</div>)
                        } else {
                            return (<>
                                <div className="d-flex w-100">
                                    <img src={CSKH} alt="avatar"
                                         style={{width: 30, height: '100%', borderRadius: '100%'}}></img>
                                    <div className="chat-bubble you ms-2" key={index}>{item.message}</div>
                                </div>
                            </>)
                        }
                    })}
                </div>
                {/*<div className="chat-input row">*/}
                {/*    <input type="text" placeholder="Type a message..." ref={mes} onKeyPress={handleKeyEnter}/>*/}
                {/*    <div className="input-action-icon">*/}
                {/*        <button type={"button"} onClick={handleMessage}>*/}
                {/*            <a className="ms-3" href="#"><i className="fas fa-paper-plane"></i></a>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div
                    className="card-footer text-muted d-flex justify-content-start align-items-center p-2 bg-white">
                    <img src={CSKH} alt="avatar 3" style={{width: 40, height: '100%', borderRadius: '100%'}}></img>
                    <input type="text" className="form-control-message"
                           placeholder="Type message" ref={mes} onKeyPress={handleKeyEnter}>
                    </input>
                    <button className="btn-file" type={"button"} onClick={handleFile}>
                        <i className="fas fa-paperclip"></i>
                    </button>
                    <button className="btn-send-message" type={"button"} onClick={handleMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </>);
}