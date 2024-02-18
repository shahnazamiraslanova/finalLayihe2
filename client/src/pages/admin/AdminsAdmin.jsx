import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css';

const AdminsAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [updatingAdmin, setUpdatingAdmin] = useState(null); // Track the admin being updated

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch('http://localhost:8080/admins');
            if (response.ok) {
                const data = await response.json();
                setAdmins(data);
            } else {
                console.error('Failed to fetch admins');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddAdmin = async () => {
        try {
            const response = await fetch('http://localhost:8080/admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, role }),
            });

            if (response.ok) {
                const newAdmin = await response.json(); // Parse the response JSON
                setAdmins([...admins, newAdmin]); // Add the new admin to the state
                setUsername(''); // Clear input fields
                setPassword('');
                setEmail('');
            } else {
                console.error('Failed to add admin');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteAdmin = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/admins/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchAdmins();
            } else {
                console.error('Failed to delete admin');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateAdmin = (admin) => {
        setUpdatingAdmin(admin);
        if (updatingAdmin !== admin) {
            setUsername(admin.username);
            setPassword('');
            setEmail(admin.email);
            setRole(admin.role);
        }
    };

    const saveUpdatedAdmin = async () => {
        if (!updatingAdmin) return;

        // Send update request with new username, password, email, and role
        try {
            const response = await fetch(`http://localhost:8080/admins/${updatingAdmin._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    role,
                }),
            });

            if (response.ok) {
                fetchAdmins();
                setUpdatingAdmin(null); // Reset updatingAdmin after successful update
                setUsername('');
                setPassword('');
                setEmail('');
                setRole('admin');
            } else {
                console.error('Failed to update admin');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='admin'>
            <h2>Admins Admin</h2>
            <div className='addform'>
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select
                    className='addInputs'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                </select>
                <button onClick={handleAddAdmin}>Add Admin</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin._id}>
                            <td>{updatingAdmin === admin ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            ) : admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{updatingAdmin === admin ? (
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                </select>
                            ) : admin.role}</td>
                            <td>
                                {updatingAdmin === admin ? (
                                    <button onClick={saveUpdatedAdmin}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateAdmin(admin)}>Update</button>
                                        <button onClick={() => handleDeleteAdmin(admin._id)}>Delete</button>
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

export default AdminsAdmin
