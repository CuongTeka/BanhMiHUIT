import React from 'react'
import './Hero.css'
import Slider from 'react-slick';
import {Image} from 'antd'

const Hero = ({arrImg}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000
  };

  return (
    <Slider {...settings}>
        {arrImg.map((image)=>{
            return(
              <Image src={image} alt="slider" preview={false} width="100%" height= "360px" />
            )
        })}
    </Slider>
  )
}

export default Hero