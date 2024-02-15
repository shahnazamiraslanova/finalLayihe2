import React, { useEffect, useState } from 'react';
import './ProgramsCard.css';
import { NavLink } from 'react-router-dom';

const ProgramsCard = () => {
    const [programs, setPrograms] = useState([]);

    const getAllPrograms = () => {
        fetch('http://localhost:8080/programs')
            .then(res => res.json())
            .then(data => setPrograms(data))
            .catch(error => console.error('Error fetching programs:', error)); // Handle errors
    };

    useEffect(() => {
        getAllPrograms();
    }, []);

    return (
        <div className="container">
            <div id='programsCards'>
                {programs.map(item => (
                    <div id='eachProgramCard' key={item._id}>
                        <img src={item.img} alt="" />
                        <div id='programCardBody'>
                            <h1>{item.title}</h1>
                            <p>{item.description.slice(0, 146)}</p>
                            <NavLink to={`/programs/${item._id}`}>More</NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramsCard;
