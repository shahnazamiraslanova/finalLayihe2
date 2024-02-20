import React, { useEffect, useState } from 'react'
import SignIn from '../../components/client/Home/SignIn'
import AboutUs from '../../components/client/Home/AboutUs'
import PhotoGallery from './../../components/client/Home/PhotoGallery';
import Parallax from '../../components/client/Home/Parallax';
import Why from '../../components/client/Home/Why';

const Home = () => {
  const [users,setUsers]=useState([])
  const getUsers=()=>{
    fetch('http://localhost:8080/users')
    .then(res=>res.json())
    .then(allusers=>setUsers(allusers))
  }
  useEffect(()=>{getUsers()},[])
  return (
<>
<SignIn users={users}/>
<AboutUs/>
<PhotoGallery/>
<Parallax/>
<Why/>
</>  )
}

export default Home