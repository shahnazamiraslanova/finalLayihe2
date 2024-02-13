import React from 'react'
import './Why.css'
import { GiGraduateCap } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";



const Why = () => {
  return (
    <div id='why'>
        <div className="container">
            <h2>Why Choose Us</h2>
            <div id='whyUs'>
                <div id='whyUsContent'>
                <div className='whyProps'><span><GiGraduateCap /></span> <p>22,931 Yearly Graduates</p></div>
                <div className='whyProps'> <span><FaUniversity /></span> <p>150 Universities Worldwide</p></div>
                <div className='whyProps'><span><GiGraduateCap /></span> <p>Top Professionals in The World</p></div>
                <div className='whyProps'> <span><FaUniversity /></span> <p>Expand Your Knowledge</p></div>
                <div className='whyProps'><span><GiGraduateCap /></span> <p>Best Online Teaching Assistant Courses</p></div>
                <div className='whyProps'> <span><FaUniversity /></span> <p>Best Teachers</p></div>
                </div>
                <div id='whyImg'> <img src="https://preview.colorlib.com/theme/oneschool/images/person_transparent.png" alt="" /></div>
            </div>
        </div>
    </div>
  )
}

export default Why