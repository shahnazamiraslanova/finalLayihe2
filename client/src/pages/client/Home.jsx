import React from 'react'
import SignIn from '../../components/client/Home/SignIn'
import AboutUs from '../../components/client/Home/AboutUs'
import PhotoGallery from './../../components/client/Home/PhotoGallery';
import Parallax from '../../components/client/Home/Parallax';
import Why from '../../components/client/Home/Why';

const Home = () => {
  return (
<>
<SignIn/>
<AboutUs/>
<PhotoGallery/>
<Parallax/>
<Why/>
</>  )
}

export default Home