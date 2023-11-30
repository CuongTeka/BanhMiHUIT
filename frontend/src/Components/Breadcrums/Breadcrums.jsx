import React, {useEffect, useState} from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { handleGetAllCategory } from '../../services/userServices'

const Breadcrums = (props) => {
    const {product} = props;
    const [category, setCategory] = useState('');
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          let data = await handleGetAllCategory()
          if(data && data.errCode === 0){
            //có thể sửa api thành lấy product by id thay vì lấy all r so sánh
            // const foundCategory = data.data.find(data => data._id === product.category_id);
            const foundCategory = data.data.find((e) => e._id === product.category_id);
            console.log(foundCategory)
            if (foundCategory) {
              setCategory(foundCategory);
            }
          }
        } catch (error) {
          console.error('Error fetching category:', error.message);
        }
      };
      fetchCategory();
    }, [product.category_id]);

  return (
    <div className='breadcrums'>
        TRANG CHỦ <img src={arrow_icon} alt=''/> SẢN PHẨM <img src={arrow_icon} alt=''/> {category.name} <img src={arrow_icon} alt=''/>{product.name}
    </div>
  )
}

export default Breadcrums