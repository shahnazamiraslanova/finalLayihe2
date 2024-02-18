import React, { useState, useEffect } from 'react';
import './CSS-S-Admin/Admin.css';

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [updatingNews, setUpdatingNews] = useState(null); // Track the news being updated

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/news');
            if (response.ok) {
                const data = await response.json();
                setNews(data);
            } else {
                console.error('Failed to fetch news');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, img }),
            });

            if (response.ok) {
                fetchNews();
                setTitle('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to add news');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteNews = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/news/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchNews();
            } else {
                console.error('Failed to delete news');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateNews = (newsItem) => {
        setUpdatingNews(newsItem);
        if (updatingNews !== newsItem) {
            setTitle(newsItem.title);
            setDescription(newsItem.description);
            setImg(newsItem.img);
        }
    };

    const saveUpdatedNews = async () => {
        if (!updatingNews) return;

        // Send update request with new title, description, and img
        try {
            const response = await fetch(`http://localhost:8080/news/${updatingNews._id}`, {
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
                fetchNews();
                setUpdatingNews(null); // Reset updatingNews after successful update
                setTitle('');
                setDescription('');
                setImg('');
            } else {
                console.error('Failed to update news');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id='admin'>
            <h2>News Admin</h2>
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
                <button onClick={handleAddNews}>Add News</button>
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
                    {news.map((newsItem) => (
                        <tr key={newsItem._id}>
                            <td>{updatingNews === newsItem ? (
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            ) : newsItem.title}</td>
                            <td>{updatingNews === newsItem ? (
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            ) : newsItem.description}</td>
                            <td>{updatingNews === newsItem ? (
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                />
                            ) : <img src={newsItem.img} alt="News" style={{ width: '100px' }} />}</td>
                            <td>
                                {updatingNews === newsItem ? (
                                    <button onClick={saveUpdatedNews}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateNews(newsItem)}>Update</button>
                                        <button onClick={() => handleDeleteNews(newsItem._id)}>Delete</button>
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

export default NewsAdmin;
