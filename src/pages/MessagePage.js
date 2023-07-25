import * as React from "react";
import {Link} from "react-router-dom";
import "./MessagePage.scss"
import * as signalR from '@microsoft/signalr';
import {useRef, useState, useEffect} from "react";
import {baseUrlHttp} from "../Constant";

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

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://server.tinderr.id.vn/chatHub')
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
            setMessages([]);
            history.forEach((item, index) => {
                const newMessages = history.map((item, index) => ({
                    key: index,
                    user: item.fromUser,
                    message: item.content,
                }));
                setMessages(prevMessages => [...prevMessages, ...newMessages]);

            })
        });

        connectionRef.current = connection;

        console.log(messages)
        return () => {
            // Clean up the connection when the component unmounts
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    const handleMessage = async () => {
        await connectionRef.current.invoke("SendMessage", userClient, mes.current.value)
        mes.current.value = "";
    }

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            handleMessage()
        }
    }

    return (<>
            <div className="chat">
                <div className="nav-bar">
                    <Link to="/" className="nav-bar__left">
                        <i className="fa-solid fa-chevron-left"></i>
                    </Link>
                    <div className="nav-bar__content">
                        Chatting
                    </div>
                </div>

                <div className="chat-screen">
                    <div className="chat-body" ref={chatBodyRef}>
                        {
                            messages.map((item, index) => {
                                if (item.user === userClient) {
                                    return (<div className="chat-bubble me float-end" key={index}>{item.message}</div>)
                                } else {
                                    return (<div className="chat-bubble you" key={index}>{item.message}</div>)
                                }
                            })
                        }
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message..." ref={mes} onKeyPress={handleKeyEnter}/>
                        <div className="input-action-icon">
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-paperclip">
                                    <path
                                        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                            </a>
                            <button type={"button"} onClick={handleMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-send">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}