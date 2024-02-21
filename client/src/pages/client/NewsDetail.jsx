import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './CSS-ES/NewsDetail.css'; // Adjust the CSS file path as needed

const NewsDetail = () => {
    const { id } = useParams(); 
    const [newsById, setNewsById] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Scroll to the top of the page when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getNewsById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/news/${id}`); // Adjust the API endpoint for news
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                const news = await response.json();
                setNewsById(news);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getNewsById();
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='newsDetailContainer'>
            <img src={newsById.img} alt="" />
            <div className="container">
                <div className='newsDetailBody'>
                    <h1>{newsById.title}</h1>
                    <p>{newsById.description}</p>
                    <p>{newsById.date.slice(0,10)}</p> {/* Assuming the date field is available in the news data */}
                    <NavLink to="/news">Go Back to News Page</NavLink> {/* Adjust the link path as needed */}
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
