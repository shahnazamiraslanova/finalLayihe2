import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";



const Header = () => {
  const navRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navRef.current;

      if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      localStorage.setItem('isLogin', 'false');
      localStorage.removeItem('loggedInUser'); // Remove the loggedInUser item from local storage
      alert("You have been logged out.");
    } else {
      alert("You did not log in.");
    }
  };

  return (
    <div id='nav' ref={navRef} className={`navbar ${isActive ? 'active' : ''}`}>
      <div className="container">
        <NavLink to="/" className="logo">Magic Academy</NavLink>
        <div className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul>
          <li><NavLink exact to="/" onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/courses" onClick={toggleMenu}>Courses</NavLink></li>
          <li><NavLink to="/teachers" onClick={toggleMenu}>Teachers</NavLink></li>
          <li><NavLink to="/programs" onClick={toggleMenu}>Programs</NavLink></li>
          <li><NavLink to="/news" onClick={toggleMenu}>News</NavLink></li>
          <li><NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink></li>
          <li className='mainIcons'><NavLink to="/favs"><FaRegHeart /></NavLink> </li>
        <li className='mainIcons'>
          <NavLink to="/cart"> <AiOutlineShoppingCart /></NavLink>
       </li>
        <li className='mainIcons' onClick={handleLogout}><IoIosLogOut /></li>

      </ul>
    </div>
    </div >
  );
};

export default Header;
