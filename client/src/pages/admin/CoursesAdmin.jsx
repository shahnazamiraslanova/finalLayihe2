import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css';

const CoursesAdmin = () => {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [updatingCourse, setUpdatingCourse] = useState(null); // Track the course being updated

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:8080/courses');
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            } else {
                console.error('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddCourse = async () => {
        try {
            const response = await fetch('http://localhost:8080/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, price, description, img }),
            });

            if (response.ok) {
                fetchCourses();
                setTitle('');
                setPrice('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to add course');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/courses/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchCourses();
            } else {
                console.error('Failed to delete course');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateCourse = (course) => {
        setUpdatingCourse(course);
        if (updatingCourse !== course) {
            setTitle(course.title);
            setPrice(course.price.toString());
            setDescription(course.description);
            setImg(course.img);
        }
    };

    const saveUpdatedCourse = async () => {
        if (!updatingCourse) return;

        // Send update request with new title, price, description, and img
        try {
            const response = await fetch(`http://localhost:8080/courses/${updatingCourse._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    price: parseFloat(price),
                    description,
                    img,
                }),
            });

            if (response.ok) {
                fetchCourses();
                setUpdatingCourse(null); // Reset updatingCourse after successful update
                setTitle('');
                setPrice('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to update course');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='admin'>
            <h2>Courses Admin</h2>
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
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                <button onClick={handleAddCourse}>Add Course</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id}>
                            <td>{updatingCourse === course ? (
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            ) : course.title}</td>
                            <td>{updatingCourse === course ? (
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            ) : course.price}</td>
                            <td>{updatingCourse === course ? (
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            ) : course.description}</td>
                            <td>{updatingCourse === course ? (
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            ) : <img src={course.img} alt="Course" style={{ width: '100px' }} />}</td>
                            <td>
                                {updatingCourse === course ? (
                                    <button onClick={saveUpdatedCourse}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateCourse(course)}>Update</button>
                                        <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
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

export default CoursesAdmin;
