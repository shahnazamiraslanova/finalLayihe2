import React, { useEffect, useState } from 'react';
import './TeachersCard.css';
import { NavLink } from 'react-router-dom';


const TeachersCard = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const getAllTeachers = () => {
        fetch('http://localhost:8080/teachers')
            .then(res => res.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching programs:', error)); // Handle errors
    };

    useEffect(() => {
        getAllTeachers();
    }, []);

    // Filter teachers based on the search query
    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handler for updating search query
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <h1 id='teachersTitle'>Get Information About Our Teachers</h1>
            <div id='searchContainer'>
                <input
                    type="text"
                    placeholder="Search by teacher name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div id='teachersCards'>
                {filteredTeachers.map(item => (
                    <div id='eachTeacherCard' key={item._id}>
                        <img src={item.img} alt="" />
                        <div id='teacherCardBody'>
                            <h1>{item.name}</h1>
                            <h2>Subject: {item.subject}</h2>
                            <h2>Experience: {item.experience} year</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeachersCard;
