import React, { useEffect, useState } from 'react'
import { useProducts } from '../Store/ProductContext';

  const SearchFilter = () => {

    const [valinput , setvalinput] = useState('');
    const {products , setFiltered , setCurrentPage } = useProducts();
    
    useEffect(()=> {
    const filterdata = products.filter((item) => item.name.toLowerCase().includes(valinput.toLocaleLowerCase()))
    setFiltered(filterdata);
    setCurrentPage(1) 
}, [valinput , products , setFiltered , setCurrentPage])
  
  return (
   <div className="search-filter">
 
      <label for="search" class="label"><span class="label-text capitalize">search product</span></label>
        <input type="text"  className='input input-bordered input-sm' value={valinput} onChange={(e)=>setvalinput(e.target.value) } />
   
      
   </div>
  )
}

export default SearchFilter