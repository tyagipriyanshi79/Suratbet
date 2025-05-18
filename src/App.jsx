import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Footer from './components/Footer'
import Contact from './components/Contact'
import Story from './components/Story'
//import Universe from './components/Universe'
//import WhoAreWe from './components/WhoAreWe'
import Glance from './components/Glance'
//import Labels from './components/Labels'
//import Updates from './components/Updates'


const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      
      <Navbar />
      <div id='hero'><Hero /></div>
      <About />
      <div id='features'><Features /></div>
      <Glance/>
      <div id='story'><Story/></div>
      
      <Contact />
      <Footer/>
       
        
    </main>
  )
}

export default App