import * as React from "react";
import {Link} from "react-router-dom";
import "./GirlsPage.scss"
import * as signalR from '@microsoft/signalr';
import {useEffect, useRef, useState} from "react";

var user3 = Math.random().toFixed(2) * 100

if (!localStorage.getItem('user')) {
    // Set the 'user' key in localStorage only if it doesn't already exist
    localStorage.setItem('user', user3);
}

localStorage.setItem("user", user3);

export default function GirlsPage() {


    const [messages, setMessages] = useState("");

    const [listMes, setListMes] = useState([])

    const [hubConnection, setHubConnection] = useState(null);
    let user1 = localStorage.getItem("user");

    useEffect(() => {

        console.log(user1)
        const startConnection = async () => {
            try {
                // Create a connection to the SignalR Hub
                let connection = new signalR.HubConnectionBuilder()
                    .withUrl('https://localhost:44349/chatHub')
                    .build();

                // Start the connection
                await connection.start();
                console.log('SignalR connected');

                connection.on("ReceiveMessageToUser", function (user, message, adminChat) {
                    setListMes((prevListMes) => [...prevListMes, {user, message}]);
                    console.log("message return", listMes);
                })

                setHubConnection(connection);

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

    const valueChatRef = useRef(null);
    const handleMessage = async () => {
        try {
            let res = await hubConnection.invoke('SendMessage', user1, valueChatRef.current.value);
        } catch (e) {
            console.log("Exxx", e)
        }
    }

    const handChange = (event) => {
        setMessages(event.target.value)
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
                    <div className="chat-body">
                        <div className="chat-start">Monday, 1:27 PM</div>

                        <div className="chat-bubble you float-end">Chăm sóc khách hàng</div>
                        {
                            listMes.map((item, index) => {
                                if (item.user == user1) {
                                    return (<div className="chat-bubble you float-end" key={index}>{item.message}</div>)
                                } else {
                                    return (<div className="chat-bubble you" key={index}>{item.message}</div>)
                                }
                            })
                        }

                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message..." ref={valueChatRef}/>
                        <div className="input-action-icon">
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-paperclip">
                                    <path
                                        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                            </a>
                            <a onClick={handleMessage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-send">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
