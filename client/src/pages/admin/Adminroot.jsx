import React from 'react'
import {Outlet} from "react-router-dom"
import AdminHeader from '../../components/admin/AdminHeader'

const AdminRoot = () => {
  return (
<>
<AdminHeader/>
<Outlet/>

</>  )
}

export default AdminRoot