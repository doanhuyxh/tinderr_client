import * as React from 'react';
import "./RegisterPage.scss";

export default function RegisterPage() {
    return (
        <>
            <div className="register-page">
                <div className="register-form">
                    <h2>Register</h2>
                    <div className="input-field">
                        <input type="text" required id="username"/>
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required id="password"/>
                        <label htmlFor="re-password">Re-Enter the password</label>
                    </div>
                    <button>Register</button>
                </div>
            </div>

        </>
    );
}
