import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './AdminHeader.css'

const AdminHeader = () => {
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

  return (
    <div id='navAdmin' ref={navRef} className={`navbarAdmin ${isActive ? 'active' : ''}`}>
      <div className="container">
        <NavLink to="/admin" className="logo">Magic Academy Admin</NavLink>
        <div className="menu-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
        </div>
        <ul>
          <li><NavLink exact to="dashboard" onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="admincourses" onClick={toggleMenu}>Courses</NavLink></li>
          <li><NavLink to="adminteachers" onClick={toggleMenu}>Teachers</NavLink></li>
          <li><NavLink to="adminprograms" onClick={toggleMenu}>Programs</NavLink></li>
          <li><NavLink to="adminnews" onClick={toggleMenu}>News</NavLink></li>
          <li><NavLink to="admincontacts" onClick={toggleMenu}>Contact</NavLink></li>
          <li><NavLink to="adminadmins" onClick={toggleMenu}>Admins</NavLink></li>
          <li><NavLink to="adminusers" onClick={toggleMenu}>Users</NavLink></li>

        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
