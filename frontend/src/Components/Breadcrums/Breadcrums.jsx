import React, {useEffect, useState} from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { handleGetAllCategory } from '../../services/categoryService'

const Breadcrumbs = (props) => {
  const { product } = props;
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        let data = await handleGetAllCategory();
        if (data && data.errCode === 0) {
          const foundCategory = data.data.find((e) => e._id === product.category_id);
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
        Trang chủ <img src={arrow_icon} alt=''/> Sản phẩm <img src={arrow_icon} alt=''/> {category.name} <img src={arrow_icon} alt=''/>{product.name}
    </div>
  );
};

export default Breadcrumbs;
