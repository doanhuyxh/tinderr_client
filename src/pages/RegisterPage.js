import * as React from 'react';
import "./RegisterPage.scss";
import {useNavigate} from "react-router-dom";
import axios from "../Axios";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form
        if (password !== rePassword) {
            setError("Passwords do not match.");
            return;
        }

        // Call register API
        axios
            .post("/api/MobileAPI/register", { username, password })
            .then((response) => {
                // Register successful, navigate to login page
                // This depends on your API's response structure
                if (response.data.success) {
                    navigate(`/login`);
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
        <div className="register-page">
            <div className="register-form">
                <h2>Register</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="text" required id="username" value={username} onChange={e => setUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="re-password" value={rePassword} onChange={e => setRePassword(e.target.value)}/>
                        <label htmlFor="re-password">Re-Enter the password</label>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
