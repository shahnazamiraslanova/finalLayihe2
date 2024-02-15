import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './CSS-ES/ProgramDetail.css'

const ProgramsDetail = () => {
    const { id } = useParams(); 
    const [programById, setProgramById] = useState({});

    const getProgramById = () => {
        fetch(`http://localhost:8080/programs/${id}`) 
            .then(res => res.json())
            .then(program => setProgramById(program))
            .catch(error => console.error('Error fetching program:', error)); 
    };

    useEffect(() => {
        getProgramById(); 
    }, [id]); 

    return (
      
         <div id='programCardsDetail'>
                        <img src={programById.img} alt="" />

             <div className="container">
           {
           <div id='detailsCardBody'>
            <h1>{programById.title}</h1>
            <h2>About:</h2>
            <p>{programById.description}</p>
            <NavLink to="/courses">Go To Courses Page To Take Course</NavLink>
           </div>
           }
        </div>
       </div>
    );
};

export default ProgramsDetail;
