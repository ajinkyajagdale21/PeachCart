import React from 'react'
import { useData } from '../dataContext'
import {ProductCard} from './ProductCard'
import { FilterAndSort } from './Filter&Sort'

export const ProductListing=()=>{
    const {loader,sortedData} =useData();
    
    return(
        <div >
          <div className="product-layout">
            <FilterAndSort/>
            <div className="product-card-top">
              {loader?<h1>Loading....</h1>:sortedData.map((product)=>
                <ProductCard product={product} key={product.id} />
              )}
            </div>
         </div>
        </div>
    )
}