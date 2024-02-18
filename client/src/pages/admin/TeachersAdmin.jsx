import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css';

const TeachersAdmin = () => {
    const [teachers, setTeachers] = useState([]);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [experience, setExperience] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [updatingTeacher, setUpdatingTeacher] = useState(null); // Track the teacher being updated

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:8080/teachers');
            if (response.ok) {
                const data = await response.json();
                setTeachers(data);
            } else {
                console.error('Failed to fetch teachers');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddTeacher = async () => {
        try {
            const response = await fetch('http://localhost:8080/teachers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, subject, experience, description, img }),
            });

            if (response.ok) {
                fetchTeachers();
                setName('');
                setSubject('');
                setExperience('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to add teacher');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteTeacher = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/teachers/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTeachers();
            } else {
                console.error('Failed to delete teacher');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateTeacher = (teacher) => {
        setUpdatingTeacher(teacher);
        if (updatingTeacher !== teacher) {
            setName(teacher.name);
            setSubject(teacher.subject);
            setExperience(teacher.experience.toString());
            setDescription(teacher.description);
            setImg(teacher.img);
        }
    };

    const saveUpdatedTeacher = async () => {
        if (!updatingTeacher) return;

        // Send update request with new name, subject, experience, description, and img
        try {
            const response = await fetch(`http://localhost:8080/teachers/${updatingTeacher._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    subject,
                    experience: parseInt(experience),
                    description,
                    img,
                }),
            });

            if (response.ok) {
                fetchTeachers();
                setUpdatingTeacher(null); // Reset updatingTeacher after successful update
                setName('');
                setSubject('');
                setExperience('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to update teacher');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='admin'>
            <h2>Teachers Admin</h2>
            <div className='addform'>
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="number"
                    placeholder="Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className='addInputs'
                    type="text"
                    placeholder="Image URL"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />
                <button onClick={handleAddTeacher}>Add Teacher</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Experience</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher._id}>
                            <td>{updatingTeacher === teacher ? (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            ) : teacher.name}</td>
                            <td>{updatingTeacher === teacher ? (
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            ) : teacher.subject}</td>
                            <td>{updatingTeacher === teacher ? (
                                <input
                                    type="number"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            ) : teacher.experience}</td>
                            <td>{updatingTeacher === teacher ? (
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            ) : teacher.description}</td>
                            <td>{updatingTeacher === teacher ? (
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            ) : <img src={teacher.img} alt="Teacher" style={{ width: '100px' }} />}</td>
                            <td>
                                {updatingTeacher === teacher ? (
                                    <button onClick={saveUpdatedTeacher}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateTeacher(teacher)}>Update</button>
                                        <button onClick={() => handleDeleteTeacher(teacher._id)}>Delete</button>
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

export default TeachersAdmin;
