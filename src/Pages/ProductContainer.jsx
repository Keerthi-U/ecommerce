import React from 'react'
 import ProductList from '../Component/ProductList'
 import SearchFilter from '../Component/SearchFilter'
//import { useProducts } from '../Store/ProductContext'


const ProductContainer = () => {
//  const {products} = useProducts()
// console.log("s" , products);

  return (
    <div className='hm-con'>
    <SearchFilter />
   <ProductList/>
    </div>
  )
}

export default ProductContainer