import React from "react";
import "./LoginPage.scss"

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-form">
                <h2>Login</h2>
                <div className="input-field">
                    <input type="text" required id="username" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                    <input type="password" required id="password" />
                    <label htmlFor="password">Password</label>
                </div>
                <button>Login</button>
            </div>
        </div>
    );
}
