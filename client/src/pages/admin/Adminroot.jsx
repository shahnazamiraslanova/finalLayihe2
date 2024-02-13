import React from 'react'
import {Outlet} from "react-router-dom"
import AdminHeader from '../../components/admin/AdminHeader'
import AdminFooter from '../../components/admin/AdminFooter'

const AdminRoot = () => {
  return (
<>
<AdminHeader/>
<Outlet/>
<AdminFooter/>

</>  )
}

export default AdminRoot