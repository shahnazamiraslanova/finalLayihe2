import React, { useEffect, useState } from 'react';
import './MainCourses.css';
import { NavLink } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart, IoIosCart } from "react-icons/io";

const MainCourses = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('priceLowToHigh');

    useEffect(() => {
        getAllCourses();
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(loggedInUser);
    }, []);

    useEffect(() => {
        filterCourses();
    }, [courses, searchTerm, sortBy]);

    const getAllCourses = () => {
        fetch('http://localhost:8080/courses')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setFilteredCourses(data);
            })
            .catch(error => console.error('Error fetching courses:', error)); 
    };

    const toggleFavorite = (course) => {
        if (!loggedInUser || !loggedInUser._id) {
            console.log("User is not logged in or user ID is undefined.");
            return alert("Please, Log in.");
        }

        if (!course || !course._id) {
            console.log("Course data is invalid.");
            return;
        }

        // Check if the user has favorites
        const updatedFavs = loggedInUser.favs ? { ...loggedInUser.favs } : {};

        // Toggle favorite status
        if (updatedFavs[course._id]) {
            delete updatedFavs[course._id];
        } else {
            updatedFavs[course._id] = course;
        }

        // Update user object with new favorites
        const updatedUser = { ...loggedInUser, favs: updatedFavs };

        // Update user in the backend (assuming the user can be updated via API)
        fetch(`http://localhost:8080/users/${loggedInUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(res => res.json())
            .then(data => {
                // Update logged in user in local storage
                localStorage.setItem('loggedInUser', JSON.stringify(data));
                setLoggedInUser(data);
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const addToCart = (course) => {
        if (!loggedInUser || !loggedInUser._id) {
            console.log("User is not logged in or user ID is undefined.");
            return alert("Please, Log in.");
        }

        if (!course || !course._id) {
            console.log("Course data is invalid.");
            return;
        }

        // Check if the user has a cart
        const updatedCart = loggedInUser.cart ? { ...loggedInUser.cart } : {};

        // Check if the course is already in the cart
        if (updatedCart[course._id]) {
            // Increase count by 1
            updatedCart[course._id].count += 1;
        } else {
            // Add the course to the cart with count 1
            updatedCart[course._id] = { ...course, count: 1 };
        }

        // Update user object with new cart
        const updatedUser = { ...loggedInUser, cart: updatedCart };

        // Update user in the backend (assuming the user can be updated via API)
        fetch(`http://localhost:8080/users/${loggedInUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(res => res.json())
            .then(data => {
                // Update logged in user in local storage
                localStorage.setItem('loggedInUser', JSON.stringify(data));
                setLoggedInUser(data);
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const filterCourses = () => {
        let filtered = [...courses];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(course => 
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by price
        if (sortBy === 'priceLowToHigh') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHighToLow') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredCourses(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div id='coursesGrid'>
              <div className="filters">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                    <h2>List Of Courses</h2>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                    </select>
                </div>
            <div className="container">
              
                {filteredCourses.map(course => (
                    <div className='courseCard' key={course._id}>
                        <img src={course.img} alt={course.title} />
                        <div className='courseCardBody'>
                            <h2>{course.title}</h2>
                            <p className='description'>{course.description}  <NavLink to="/programs">Programs</NavLink> </p>
                            <p className='price'>Price: ${course.price}</p>
                            <div className='icons'>
                                {loggedInUser && loggedInUser.favs && loggedInUser.favs[course._id] ? (
                                    <IoIosHeart onClick={() => toggleFavorite(course)} className='heartIcon' />
                                ) : (
                                    <IoIosHeartEmpty onClick={() => toggleFavorite(course)} className='heartIcon' />
                                )}
                                <IoIosCart onClick={() => addToCart(course)} className='cartIcon' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainCourses;
