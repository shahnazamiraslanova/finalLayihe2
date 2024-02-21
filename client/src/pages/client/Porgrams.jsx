import React, { useEffect } from 'react'
import OurPrograms from '../../components/client/Programs/OurPrograms.jsx'
import ProgramMain from '../../components/client/Programs/ProgramMain.jsx'
import ProgramsCard from '../../components/client/Programs/ProgramsCard.jsx'

const Porgrams = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
<>
<OurPrograms/>
<ProgramMain/>
<ProgramsCard/>


</>  )
}

export default Porgrams