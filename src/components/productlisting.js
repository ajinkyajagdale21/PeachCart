import React from 'react'
import { useData } from '../dataContext'
import {ProductCard} from './ProductCard'
import { FilterAndSort } from './Filter&Sort'
import { Sidebar } from './Sidebar'

export const ProductListing=()=>{
    const {loader,pricedFilter} =useData();
    
    return(
        <div >
          <Sidebar/>
          <div className="product-layout">
            <FilterAndSort/>
            <div className="product-card-top">
              {loader?<h1>Loading....</h1>:pricedFilter.map((product)=>
                <ProductCard product={product} key={product._id} />
              )}
            </div>
         </div>
        </div>
    )
}