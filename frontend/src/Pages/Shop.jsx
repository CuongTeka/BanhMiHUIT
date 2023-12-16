import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Adver from '../Components/Adver/Adver'
import banner1 from '../Components/Assets/BanhmiBG1.png'
import banner2 from '../Components/Assets/BanhmiBG2.png'
import banner3 from '../Components/Assets/BanhmiBG3.png'
import banner4 from '../Components/Assets/BanhmiBG4.png'

const Shop = () => {
  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Hero arrImg={[banner1, banner2, banner3, banner4]}/>
      <Adver/>
      <Popular/>
     
    </div>
  )
}

export default Shop
