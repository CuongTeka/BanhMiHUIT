import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
  const { all_product, loading, error } = useContext(ShopContext);
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
  const product = all_product.find((e) => e._id === productId);
  // Handle case when the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }
  console.log(product)
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product
