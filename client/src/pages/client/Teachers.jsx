import React, { useEffect } from 'react'
import OurTeachers from '../../components/client/Teachers/OurTrachers'
import TeachersCard from '../../components/client/Teachers/TeachersCard'

const Teachers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
<>
<OurTeachers/>
<TeachersCard/>

</>  )
}

export default Teachers