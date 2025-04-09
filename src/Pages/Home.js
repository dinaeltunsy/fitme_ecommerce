import React from 'react'
import Hero from '../Pages/Hero'
import ProductList from './ProductList'
import Winter from '../Collections/Winter'
import Men from './Sections/Men'
import Women from './Sections/Women'
import Kids from './Sections/Kids'
import'./Home.css'





const Home = () => {
  return (

    <div>

      <Hero/>

      <div className='home-sections-header'><h3 className='section-header'>WINTER COLLECTION</h3></div><Winter/>
      <div className='home-sections-header'><h3>MEN</h3></div><Men/>
      <div className='home-sections-header'><h3>WOMEN</h3></div><Women/>
      <div className='home-sections-header'><h3>KIDS</h3></div><Kids/>
      <div className='home-sections-header'><h3>ALL NEW COLLECTIONS</h3></div><ProductList/>

    </div>
    
  )
}

export default Home