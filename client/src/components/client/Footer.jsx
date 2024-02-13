import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <div id='footer'>
      <div className="container">
        <div id='footMain'>
          <div>
            <h2>ABOUT Magic Academy</h2>
            <p>Magic Academy is a prestigious institution with a rich history in magical education. Our team of experienced and skilled teachers are committed to guiding students on a magical journey, unlocking the secrets of spells, illusions, and the mystical arts.</p>
          </div>
          <div>
            <h2>LINKS</h2>
            <ul>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='courses'>Courses</NavLink></li>
              <li><NavLink to='programs'>Programs</NavLink></li>
              <li><NavLink to='teachers'>Teachers</NavLink></li>
              <li><NavLink to='news'>News</NavLink></li>
              <li><NavLink to='contact'>Contact</NavLink></li>

            </ul>
          </div>
          <div>
            <h2>SUBSCRIBE</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate accusantium doloribus ipsum alias similique maxime laboriosam necessitatibus molestias voluptate deserunt.</p>
            <div id='footInp'>
              <input type="text" placeholder='Email' />
              <input type="submit" name="" id="submit" placeholder='SUBSCRIBE' />
            </div>
          </div>
        </div>


        <div id='footBottom'>
        Copyright ©2024 All rights reserved | This template is made with  by   <a target='blank' href="https://www.linkedin.com/in/shahnaz-amiraslanova-4a1391294/">Shahnaz Amiraslanova</a>
        </div>
      </div>
    </div>
  )
}

export default Footer