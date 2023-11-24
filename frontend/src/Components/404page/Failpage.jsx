import React from 'react'
import './Failpage.css'
import fail_img from '../Assets/doona404page.png'

const Failpage = () => {
  return (
    <div className='failpage'>
      <img src={fail_img} alt="" />
      <h1>404 ERROR Page !!!</h1>
    </div>
  )
}

export default Failpage