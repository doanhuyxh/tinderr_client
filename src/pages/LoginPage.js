import React from "react";
import "./LoginPage.scss"
import {useNavigate} from "react-router-dom";
import axios from "../Axios";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Call login API
        axios
            .post("/api/MobileAPI/login", { username, password })
            .then((response) => {
                // Login successful, navigate to another page
                // This depends on your API's response structure
                if (response.data.success) {
                    navigate(`/`);
                } else {
                    setError(response.data.message || 'Unknown error');
                }
            })
            .catch((error) => {
                // Handle error during API call
                setError(error.message);
            });
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="text" required id="username" value={username} onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
