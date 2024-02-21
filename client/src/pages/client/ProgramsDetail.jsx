import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './CSS-ES/ProgramDetail.css';

const ProgramsDetail = () => {
    const { id } = useParams(); 
    const [programById, setProgramById] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Scroll to the top of the page when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getProgramById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/programs/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch program');
                }
                const program = await response.json();
                setProgramById(program);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProgramById();
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='programCardsDetail'>
            <img src={programById.img} alt="" />
            <div className="container">
                <div className='detailsCardBody'>
                    <h1>{programById.title}</h1>
                    <h2>About:</h2>
                    <p>{programById.description}</p>
                    <NavLink to="/courses">Go To Courses Page To Take Course</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProgramsDetail;
