import React from 'react'
import Header from '../../components/client/Header'
import {Outlet} from "react-router-dom"
import Footer from '../../components/client/Footer'

const Root = () => {
  return (
<>
<Header/>
<Outlet/>
<Footer/>

</>  )
}

export default Root