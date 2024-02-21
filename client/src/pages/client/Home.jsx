import React, { useEffect, useState } from 'react'
import SignIn from '../../components/client/Home/SignIn'
import PhotoGallery from './../../components/client/Home/PhotoGallery';
import Parallax from '../../components/client/Home/Parallax';
import Why from '../../components/client/Home/Why';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

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
<PhotoGallery/>
<Parallax/>
<Why/>
</>  )
}

export default Home