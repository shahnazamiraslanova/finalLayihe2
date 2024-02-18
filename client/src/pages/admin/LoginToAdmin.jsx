import React, { useState } from 'react';
import './CSS-S-Admin/Login.css'

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Here you will send a request to your admin API to check if the credentials are valid
        // If valid, navigate to '/admins/dashboard', otherwise, show an error message

        try {
            // Example code for sending request to your API
            const response = await fetch('http://localhost:8080/admins')
                .then(res => res.json())
                .then(admins => setData(admins));

            const checkAdmin = () => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].role === role && data[i].password === password && data[i].username === username) {
                        return true;
                    }
                }
                return false;
            }

            // Assuming your API returns a list of admins matching the criteria
            if (checkAdmin()) {
                window.location.href = '/73QmFV5$1cNlDzO!S6p9oWvXr8Kt2yG3JhU*AqIbR7dExP4gTfHnZsYwMeCaB0iL/dashboard'; // Directly navigate to the admin dashboard
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to login');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Admin Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <button type="submit" className="login-btn">Login</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default LoginAdmin;
