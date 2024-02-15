import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './CSS-ES/NewsDetail.css'

const ProgramsDetail = () => {
    const { id } = useParams(); 
    const [newsById, setNewsById] = useState({});

    const getNewsById = () => {
        fetch(`http://localhost:8080/news/${id}`) 
            .then(res => res.json())
            .then(news => setNewsById(news))
            .catch(error => console.error('Error fetching program:', error)); 
    };

    useEffect(() => {
        getNewsById(); 
    }, [id]); 

    return (
      
         <div id='newsCardsDetail'>
                        <img src={newsById.img} alt="" />

             <div className="container">
           {
           <div id='detailsCardBodyNews'>
            <h1>{newsById.title}</h1>
            <p>{newsById.description}</p>
            <p>Date:{newsById.date.slice(0,10)}</p>
           </div>
           }
        </div>
       </div>
    );
};

export default ProgramsDetail;
