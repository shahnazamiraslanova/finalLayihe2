import React from 'react'
import './AboutUs.css'
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div id='about'>
      <div className="container">
        <h3>ABOUT US</h3>
        <p>Magic Academy is a prestigious institution with a rich history in magical education. Our team of experienced and skilled teachers are committed to guiding students on a magical journey, unlocking the secrets of spells, illusions, and the mystical arts.
        At Magic Academy, we believe in the transformative power of education and the enchanting world of magic. Our academy is dedicated to providing a unique and immersive learning experience for individuals who are passionate about the art of magic.
        </p>
        <NavLink to="courses"> See Our All Courses</NavLink>
        <NavLink to="teachers">See Our All Teachers</NavLink>
        <NavLink to="programs">See Our Programs for Each Course</NavLink>
        <NavLink to="contact">Contact with Us</NavLink>


      </div>
    </div>
  )
}

export default AboutUs