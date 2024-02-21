import React, { useEffect } from 'react'
import ContactUs from '../../components/client/Contact/ContactUs'
import Form from '../../components/client/Contact/Form'
import OurContactData from '../../components/client/Contact/OurContactData'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
<>
<ContactUs/>
<Form/>
<OurContactData/>

</>  )
}

export default Contact