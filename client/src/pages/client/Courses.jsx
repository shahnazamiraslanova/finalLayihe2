import React, { useEffect } from 'react'
import OurCourses from "../../components/client/Courses/OurCourses.jsx"
import MainCourses from '../../components/client/Courses/MainCourses.jsx'

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    
<>
<OurCourses/>
<MainCourses/>

</>  )
}

export default Courses