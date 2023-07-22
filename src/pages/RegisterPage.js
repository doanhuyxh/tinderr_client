import * as React from 'react';
import "./RegisterPage.scss";
import {useNavigate} from "react-router-dom";
import axios from "../Axios";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [inviteCode, setInviteCode] = React.useState("");
    const [error, setError] = React.useState(null);
    const [ip, setIp] = React.useState("");

    React.useEffect(() => {
        fetch('http://api.ipify.org/?format=json')
            .then(response => {
                return response.json();
            })
            .then(data => setIp(data.ip))
            .catch(() => setIp('0.0.0.0'));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setError("Passwords do not match.");
            return;
        }
        let passwordHash = password;
        let userName = username;
        fetch("http://server.tinderr.id.vn/api/MobileAPI/register", {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({userName, passwordHash, inviteCode, ip}),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    navigate(`/login`);
                } else {
                    setError(data.message || 'Unknown error');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (<>
        <div className="register-page">
            <div className="register-form">
                <h2>Register</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="text" required id="username" value={username}
                               onChange={e => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="re-password" value={rePassword}
                               onChange={e => setRePassword(e.target.value)}/>
                        <label htmlFor="re-password">Re-Enter the password</label>
                    </div>
                    <div className="input-field">
                        <input type="text" required id="invite-code" value={inviteCode}
                               onChange={e => setInviteCode(e.target.value)}/>
                        <label htmlFor="invite-code">Invite Code</label>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    </>);
}
