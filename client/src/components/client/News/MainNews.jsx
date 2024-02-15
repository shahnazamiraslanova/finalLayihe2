import React, { useEffect, useState } from 'react';
import './MainNews.css';
import { NavLink } from 'react-router-dom';

const MainNews = () => {
    const [news, setNews] = useState([]);

    const getAllNews = () => {
        fetch('http://localhost:8080/news')
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching programs:', error)); // Handle errors
    };

    useEffect(() => {
        getAllNews();
    }, []);

    return (
        <div className="container">
            <div id='newsCard'>
                {news.map(item => (
                    <div id='eachNewsCard' key={item._id}>
                        <img src={item.img} alt="" />
                        <div id='newsCardBody'>
                            <h1>{item.title}</h1>
                            <p>{item.description.slice(0, 140)}...</p>
                            <p>{item.date.slice(0,10)}</p>
                            <NavLink to={`/news/${item._id}`}>More</NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainNews;
