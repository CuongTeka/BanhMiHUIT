import React from 'react'
import './Failpage.css'
import fail_img from '../Assets/404page.png'

const Failpage = () => {
  return (
    <div className='failpage'>
      <img src={fail_img} alt={<h1>404 ERR !!!</h1>} />
      
    </div>
  )
}

export default Failpage