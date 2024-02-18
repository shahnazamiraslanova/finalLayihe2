import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './CSS-S-Admin/DashboardCss.css';

const Dashboard = () => {
    const [counts, setCounts] = useState({
        teachers: 0,
        courses: 0,
        news: 0,
        programs: 0,
        admins: 0,
        users: 0,
        contacts: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const teachersResponse = await fetch('http://localhost:8080/teachers');
            const teachersData = await teachersResponse.json();
            const coursesResponse = await fetch('http://localhost:8080/courses');
            const coursesData = await coursesResponse.json();
            const newsResponse = await fetch('http://localhost:8080/news');
            const newsData = await newsResponse.json();
            const programsResponse = await fetch('http://localhost:8080/programs');
            const programsData = await programsResponse.json();
            const adminsResponse = await fetch('http://localhost:8080/admins');
            const adminsData = await adminsResponse.json();
            const usersResponse = await fetch('http://localhost:8080/users');
            const usersData = await usersResponse.json();
            const contactsResponse = await fetch('http://localhost:8080/contacts');
            const contactsData = await contactsResponse.json();

            setCounts({
                teachers: teachersData.length,
                courses: coursesData.length,
                news: newsData.length,
                programs: programsData.length,
                admins: adminsData.length,
                users: usersData.length,
                contacts: contactsData.length
            });

            // Draw chart after data is fetched
            drawChart(contactsData.length);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const drawChart = (contactCount) => {
        const ctx = document.getElementById('contactsChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Contacts'],
                datasets: [{
                    label: 'Number of Contacts',
                    data: [contactCount],
                    backgroundColor: '#007bff'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h3>Teachers</h3>
                <p>{counts.teachers}</p>
            </div>
            <div className="dashboard-card">
                <h3>Courses</h3>
                <p>{counts.courses}</p>
            </div>
            <div className="dashboard-card">
                <h3>News</h3>
                <p>{counts.news}</p>
            </div>
            <div className="dashboard-card">
                <h3>Programs</h3>
                <p>{counts.programs}</p>
            </div>
            <div className="dashboard-card">
                <h3>Admins</h3>
                <p>{counts.admins}</p>
            </div>
            <div className="dashboard-card">
                <h3>Users</h3>
                <p>{counts.users}</p>
            </div>
            <div className="dashboard-card">
                <h3>Contacts</h3>
                <p>{counts.contacts}</p>
            </div>
            <div className="dashboard-card">
                <h3>Contacts</h3>
                <canvas id="contactsChart" width="500" height="500"></canvas>
            </div>
        </div>
    );
};

export default Dashboard;
