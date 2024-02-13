import React from 'react'
import './ProgramMain.css'

import { GiGraduateCap } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";

const ProgramMain = () => {
    return (
        <div className='programMain'>
            <div className="container">
                <div className='programMainArticle'>
                    <h2>OUR PROGRAM</h2>
                    <p>Are you fascinated by the world of data and eager to learn how to extract valuable insights from it? Our Introduction to Programming course is designed to equip you with the fundamental knowledge and skills needed to embark on a journey into the exciting field of data science.</p>

                </div>
                <div className='programFirst'>
                    <div className='programMainFirstImg'><img src="https://preview.colorlib.com/theme/oneschool/images/undraw_youtube_tutorial.svg" alt="" /></div>
                    <div className='proramMainFirstArticle'>
                        <h3>We Are Excellent In Education</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maxime nam porro possimus fugiat quo molestiae illo.</p>
                        <div className='programFirstIcon'>
                            <div className='programIcon1'>
                                <span>                                <GiGraduateCap />
                                </span>
                                <p>
                                    22,931 Yearly Graduates
                                </p>
                            </div>
                            <div className='programIcon2'>
                                <span>                                <FaUniversity />
                                </span>
                                <p>
                                    150 Universities Worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='programFirst'>
                    <div className='proramMainFirstArticle'>
                        <h3>We Are Excellent In Education</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maxime nam porro possimus fugiat quo molestiae illo.</p>
                        <div className='programFirstIcon'>
                            <div className='programIcon1'>
                                <span>                                <GiGraduateCap />
                                </span>
                                <p>
                                    22,931 Yearly Graduates
                                </p>
                            </div>
                            <div className='programIcon2'>
                                <span>                                <FaUniversity />
                                </span>
                                <p>
                                    150 Universities Worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='programMainFirstImg'><img src="https://preview.colorlib.com/theme/oneschool/images/undraw_teaching.svg" alt="" /></div>

                </div>
            </div>
        </div>
    )
}

export default ProgramMain