import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css';

const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updatingUser, setUpdatingUser] = useState(null); // Track the user being updated

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastName, username, email, password }),
            });

            if (response.ok) {
                fetchUsers();
                setName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchUsers();
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateUser = (user) => {
        setUpdatingUser(user);
        setName(user.name);
        setLastName(user.lastName);
        setUsername(user.username);
        setEmail(user.email);
        setPassword('');
    };

    const saveUpdatedUser = async () => {
        if (!updatingUser) return;

        // Send update request with new name, lastName, username, email, and password
        try {
            const response = await fetch(`http://localhost:8080/users/${updatingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    lastName,
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                fetchUsers();
                setUpdatingUser(null); // Reset updatingUser after successful update
                setName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='admin'>
            <h2>Users Admin</h2>
            <div className='addform'>
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Name"
                    value={updatingUser ? updatingUser.name : name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Last Name"
                    value={updatingUser ? updatingUser.lastName : lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Username"
                    value={updatingUser ? updatingUser.username : username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="email"
                    placeholder="Email"
                    value={updatingUser ? updatingUser.email : email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{updatingUser === user ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            ) : user.name}</td>
                            <td>{updatingUser === user ? (
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            ) : user.lastName}</td>
                            <td>{updatingUser === user ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            ) : user.username}</td>
                            <td>{updatingUser === user ? (
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : user.email}</td>
                            <td>********</td>
                            <td>
                                {updatingUser === user ? (
                                    <button onClick={saveUpdatedUser}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateUser(user)}>Update</button>
                                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersAdmin;
