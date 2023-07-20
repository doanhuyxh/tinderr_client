import * as React from "react";
import {Link} from "react-router-dom";
import "./GirlsPage.scss"
import * as signalR from '@microsoft/signalr';
import {useEffect, useState} from "react";

var user = Math.random().toFixed(2)*100

if (!localStorage.getItem('user')) {
    // Set the 'user' key in localStorage only if it doesn't already exist
    localStorage.setItem('user', user);
}

localStorage.setItem("user", user);

export default function GirlsPage() {
    var hubConnection;
    const [messages, setMessages] = useState([]);
    let user1 = localStorage.getItem("user");
    useEffect(() => {

        console.log(user1)
        const startConnection = async () => {
            try {
                // Create a connection to the SignalR Hub
                hubConnection = new signalR.HubConnectionBuilder()
                    .withUrl('https://localhost:44349/chatHub')
                    .build();

                // Start the connection
                await hubConnection.start();
                console.log('SignalR connected');

                // Invoke the SendMessage method after the connection is established
                hubConnection.invoke('SendMessage', user1, 'Xin chào admin');

                // Set up event listeners for receiving messages from the server
                hubConnection.on('ReceiveMessage', (user, message) => {
                    setMessages((prevMessages) => [...prevMessages, { user, message }]);
                });
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

    const handleMessage = () => {
        this.hubConnection.invoke('SendMessage', user1, messages);
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
                        {/*<div className="chat-bubble me">Welcome to our site, if you need help simply reply to this*/}
                        {/*    message, we are online and ready to help.*/}
                        {/*</div>*/}
                        <div className="chat-bubble you">Chăm sóc khách hàng</div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Type a message..." onChange={handChange}/>
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
