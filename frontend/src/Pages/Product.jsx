import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
  const { products, loading, error } = useContext(ShopContext);
  const { productId } = useParams();

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading product data</div>;
  }
  // console.log('onepro: ' )
  // console.log('proid: ' )
  const product = products.find((e) => e._id === productId);
  // Handle case when the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }
  // console.log('all product' + all_product)
  // console.log('product' + product)
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product
