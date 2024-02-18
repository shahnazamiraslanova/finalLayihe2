import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css';

const ProgramsAdmin = () => {
    const [programs, setPrograms] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [updatingProgram, setUpdatingProgram] = useState(null); // Track the program being updated

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://localhost:8080/programs');
            if (response.ok) {
                const data = await response.json();
                setPrograms(data);
            } else {
                console.error('Failed to fetch programs');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddProgram = async () => {
        try {
            const response = await fetch('http://localhost:8080/programs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, img }),
            });

            if (response.ok) {
                fetchPrograms();
                setTitle('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to add program');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteProgram = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/programs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPrograms();
            } else {
                console.error('Failed to delete program');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateProgram = (program) => {
        setUpdatingProgram(program);
        if (updatingProgram !== program) {
            setTitle(program.title);
            setDescription(program.description);
            setImg(program.img);
        }
    };

    const saveUpdatedProgram = async () => {
        if (!updatingProgram) return;

        // Send update request with new title, description, and img
        try {
            const response = await fetch(`http://localhost:8080/programs/${updatingProgram._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    img,
                }),
            });

            if (response.ok) {
                fetchPrograms();
                setUpdatingProgram(null); // Reset updatingProgram after successful update
                setTitle('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to update program');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='admin'>
            <h2>Programs Admin</h2>
            <div className='addform'>
                <input
                    className='addInputs'

                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                <button onClick={handleAddProgram}>Add Program</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr key={program._id}>
                            <td>{updatingProgram === program ? (
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            ) : program.title}</td>
                            <td>{updatingProgram === program ? (
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            ) : program.description}</td>
                            <td>{updatingProgram === program ? (
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            ) : <img src={program.img} alt="Program" style={{ width: '100px' }} />}</td>
                            <td>
                                {updatingProgram === program ? (
                                    <button onClick={saveUpdatedProgram}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateProgram(program)}>Update</button>
                                        <button onClick={() => handleDeleteProgram(program._id)}>Delete</button>
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

export default ProgramsAdmin;
