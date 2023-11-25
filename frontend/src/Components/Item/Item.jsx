import React, {useState, useEffect} from 'react'
import './Item.css'
import { Link } from 'react-router-dom'


const Item = (props) => {
  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        setImageData(`http://localhost:8080/api/images?imageName=${encodeURIComponent(props.image)}`)
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };
    fetchImage();
  }, [props.image]);
  console.log(process.env.BEURL)
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={imageData} alt=""/></Link>
        <p>{props.name}</p>
        <div className = 'item-new-price'>
          {props.price}
        </div>
        {props.category}
    </div>
  )
}

export default Item