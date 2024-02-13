import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navRef = useRef(null);

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

  return (
    <div id='nav' ref={navRef} className="navbar">
      <div className="container">
        <NavLink to="/" className="logo">Magic Academy</NavLink>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/courses">Courses</NavLink></li>
          <li><NavLink to="/teachers">Teachers</NavLink></li>
          <li><NavLink to="/programs">Programs</NavLink></li>
          <li><NavLink to="/news">News</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
