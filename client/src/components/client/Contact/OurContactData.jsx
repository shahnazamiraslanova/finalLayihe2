import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import './OurContactData.css'



const OurContactData = () => {
  return (
    <div id='ourData'>
      <div className="container">
      <h2>You can also contact with us with:</h2>
        <ul>
            <li><FaPhoneAlt />:+994707777777</li>
            <li><IoMail />:magic@gmail.com</li>
            <li><FaInstagram />: <a href="https://www.instagram.com/sh010.10/">magic_course</a></li>
        </ul>
      </div>
    </div>
  )
}

export default OurContactData